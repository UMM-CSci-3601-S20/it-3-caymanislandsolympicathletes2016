package umm3601.note;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.client.MongoClient;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;
import io.javalin.http.NotFoundResponse;

import umm3601.notes.Note;
import umm3601.notes.NoteController;

public class NoteControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private NoteController noteController;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
    MongoClientSettings.builder()
    .applyToClusterSettings(builder ->
    builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
    .build());

    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setupEach() throws IOException {

    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    // Setup database
    MongoCollection<Document> noteDocuments = db.getCollection("notes");
    noteDocuments.drop();
    List<Document> testNotes = new ArrayList<>();
    testNotes.add(Document.parse("{\n" +
    "                    body: \"This is the first body\",\n" +
    "                }"));
    testNotes.add(Document.parse("{\n" +
    "                    body: \"This is the second body\",\n" +
    "                }"));
    testNotes.add(Document.parse("{\n" +
    "                    body: \"This is the third body\",\n" +
    "                }"));

    noteDocuments.insertMany(testNotes);

    noteController = new NoteController(db);
  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @Test
  public void GetAllNotes() throws IOException {

    // Create our fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes");
    noteController.getNotes(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    assertEquals(db.getCollection("notes").countDocuments(), JavalinJson.fromJson(result, Note[].class).length);
  }

 @Test
  public void GetNoteWithExistentId() throws IOException {

    String testID = db.getCollection("notes").find(eq("body", "This is the first body")).first().get("_id").toString();

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/:id", ImmutableMap.of("id", testID));
    noteController.getNoteByID(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    Note resultNote = JavalinJson.fromJson(result, Note.class);

    assertEquals(resultNote._id, testID);
    assertEquals(resultNote.body, "This is the first body");
  }

  @Test
  public void GetNoteWithBadId() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/:id", ImmutableMap.of("id", "bad"));

    assertThrows(BadRequestResponse.class, () -> {
      noteController.getNoteByID(ctx);
    });
  }

  @Test
  public void GetNoteWithNonexistentId() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/:id", ImmutableMap.of("id", "58af3a600343927e48e87335"));

    assertThrows(NotFoundResponse.class, () -> {
      noteController.getNoteByID(ctx);
    });
  }

  @Test
  public void AddNote() throws IOException {

    String testNewNote = "{\"body\": \"Test Note\"}";

    mockReq.setBodyContent(testNewNote);
    mockReq.setMethod("POST");

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/new");

    noteController.addNote(ctx);

    assertEquals(201, mockRes.getStatus());

    String result = ctx.resultString();
    String id = jsonMapper.readValue(result, ObjectNode.class).get("id").asText();
    assertNotEquals("", id);

    assertEquals(1, db.getCollection("notes").countDocuments(eq("_id", new ObjectId(id))));

    Document addedNote = db.getCollection("notes").find(eq("_id", new ObjectId(id))).first();
    assertNotNull(addedNote);
    assertEquals("Test Note", addedNote.getString("body"));
  }

  @Test
  public void AddNoteWithTooShortBody() throws IOException {
    String testNewNote = "{\"body\":\"x\"}";
    mockReq.setBodyContent(testNewNote);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/new");

    assertThrows(BadRequestResponse.class, () -> {
      noteController.addNote(ctx);
    });
  }

  @Test
  public void AddNoteWithTooLongBody() throws IOException {
    String testNewNote = "{\"body\":\"";
    for(int i = 0; i < 1000; i++) {
      testNewNote = testNewNote + "x";
    }
    testNewNote = testNewNote + "\"}";

    mockReq.setBodyContent(testNewNote);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/new");

    assertThrows(BadRequestResponse.class, () -> {
      noteController.addNote(ctx);
    });
  }

  @Test
  public void EditNote() throws IOException {
    String newBody = "This will be the new body";
    String id = db.getCollection("notes").find(eq("body", "This is the first body")).first().get("_id").toString();

    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes/edit", ImmutableMap.of("id", id, "body", newBody));

    noteController.editNote(ctx);

    assertEquals(204, mockRes.getStatus());

    String updatedBody = db.getCollection("notes").find(eq("_id", new ObjectId(id))).first().get("body").toString();
    assertEquals(newBody, updatedBody);
  }
}
