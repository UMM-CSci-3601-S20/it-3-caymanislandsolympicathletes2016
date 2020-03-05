package umm3601.notes;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.mongojack.JacksonCodecRegistry;

public class NoteController {

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();

  private final MongoCollection<Note> noteCollection;

  public NoteController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(Note.class);
    noteCollection = database.getCollection("notes").withDocumentClass(Note.class)
        .withCodecRegistry(jacksonCodecRegistry);
  }
}
