package umm3601.notes;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.mongojack.JacksonCodecRegistry;

import io.javalin.http.Context;

public class NoteController {

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();

  private final MongoCollection<Note> noteCollection;

  public NoteController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(Note.class);
    noteCollection = database.getCollection("notes").withDocumentClass(Note.class)
        .withCodecRegistry(jacksonCodecRegistry);
  }

  public void getNotes(Context ctx) {
    ctx.json(noteCollection.find(new Document()).into(new ArrayList<>()));
  }

  public void deleteNote(Context ctx) {
    String id = ctx.pathParam("id");
    noteCollection.deleteOne(eq("_id", new ObjectId(id)));
  }
}
