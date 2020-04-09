package umm3601.notes;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.CheckReturnValue;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Updates.set;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonCodecRegistry;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import umm3601.TokenVerifier;
import umm3601.owners.Owner;

public class NoteController {

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();

  private MongoCollection<Owner> ownerCollection;
  private final MongoCollection<Note> noteCollection;
  private final TokenVerifier tokenVerifier;

  public static final String DELETED_RESPONSE = "deleted";
  public static final String NOT_DELETED_RESPONSE = "nothing deleted";

  public NoteController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(Note.class);
    noteCollection = database.getCollection("notes").withDocumentClass(Note.class)
        .withCodecRegistry(jacksonCodecRegistry);
    tokenVerifier = new TokenVerifier();
  }

  public boolean verifyHttpRequest(Context ctx) throws Exception {
    if (!this.tokenVerifier.verifyToken(ctx)) {
      throw new BadRequestResponse("Invalid header token. The request is not authorized.");
    } else {
      return true;
    }
  }

  public void getNoteByID(Context ctx) {
    String id = ctx.pathParam("id");
    Note note;

    try {
      note = noteCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse("The requested note id wasn't a legal Mongo Object ID.");
    }
    if (note == null) {
      throw new NotFoundResponse("The requested note was not found");
    } else {
      ctx.json(note);
    }
  }

  public void getOwnerNotes(Context ctx) {

    List<Bson> filters = new ArrayList<Bson>(); // start with a blank document

    if (ctx.queryParamMap().containsKey("owner_id")) {
      filters.add(eq("owner_id", ctx.queryParam("owner_id")));
    if (ctx.queryParamMap().containsKey("posted")) {
      filters.add(eq("posted", Boolean.parseBoolean(ctx.queryParam("posted"))));
    }
    }else{
      throw new NotFoundResponse("The requested owner was not found");
    }

    ctx.json(noteCollection.find(filters.isEmpty() ? new Document() : and(filters))
    .into(new ArrayList<>()));
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

  public void editNote(Context ctx) {
    String id = ctx.pathParamMap().get("id");

    Note newNote= ctx.bodyValidator(Note.class)
    .check((note) -> note.body.length() >= 2 && note.body.length() <= 300).get();
    String newBody = newNote.body;

    Note oldNote = noteCollection.findOneAndUpdate(eq("_id", new ObjectId(id)), set("body", newBody));

    if (oldNote == null) {
      ctx.status(400);
      throw new NotFoundResponse("The requested note was not found");
    } else {
      ctx.status(200);
      ctx.json(ImmutableMap.of("id", id));
    }
  }

  /**
   * Move a note with a given id to the trash, if the id exists.
   *
   * If the id does not exist, do nothing.
   */
  // need to verify that owner is correct owner
  public void deleteNote(Context ctx) {
    String id = ctx.pathParamMap().get("id");
    // check if owner id of a note, matches logged in user's id
    Note oldNote = noteCollection.findOneAndUpdate(eq("_id", new ObjectId(id)), set("posted", false));

    if (oldNote == null) {
      throw new NotFoundResponse("The requested note was not found");
    } else {
      ctx.status(200);
      ctx.json(ImmutableMap.of("id", id));
    }
  }

  public void restoreNote(Context ctx) {
    String id = ctx.pathParamMap().get("id");
    // check if owner id of a note, matches logged in user's id
    Note oldNote = noteCollection.findOneAndUpdate(eq("_id", new ObjectId(id)), set("posted", true));

    if (oldNote == null) {
      throw new NotFoundResponse("The requested note was not found");
    } else {
      ctx.status(200);
      ctx.json(ImmutableMap.of("id", id));
    }
  }
}
