package umm3601.notes;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.mongojack.JacksonCodecRegistry;

import io.javalin.http.Context;

public class NoteController {

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();

  private final MongoCollection<Note> noteCollection;

  public static final String DELETED_RESPONSE = "deleted";
  public static final String NOT_DELETED_RESPONSE = "nothing deleted";

  public NoteController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(Note.class);
    noteCollection = database.getCollection("notes").withDocumentClass(Note.class)
        .withCodecRegistry(jacksonCodecRegistry);
  }

  public void getNotes(Context ctx) {
    ctx.json(noteCollection.find(new Document()).into(new ArrayList<>()));
  }

  public void addNote(Context ctx) {

    Note newNote = ctx.bodyValidator(Note.class)
    .check((note) -> note.body.length() >= 2 && note.body.length() <= 300).get();

    noteCollection.insertOne(newNote);
    ctx.status(201);
    ctx.json(ImmutableMap.of("id", newNote._id));
  }

  /**
   * Delete a note with a given id, if the id exists.
   *
   * If the id does not exist, do nothing.
   */
  public void deleteNote(Context ctx) {
    String id = ctx.pathParam("id");
    DeleteResult result = noteCollection.deleteOne(eq("_id", new ObjectId(id)));

    if (result.getDeletedCount() > 0) {
      ctx.result(DELETED_RESPONSE);
    } else {
      // Deleting a non-existent id is still considered a success.
      ctx.result(NOT_DELETED_RESPONSE);
    }
  }
}
