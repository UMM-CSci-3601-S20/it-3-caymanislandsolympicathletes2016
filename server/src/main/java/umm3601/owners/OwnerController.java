package umm3601.owners;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import java.util.List;

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

public class OwnerController {

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();

  private final MongoCollection<Owner> ownerCollection;

  public static final String DELETED_RESPONSE = "deleted";
  public static final String NOT_DELETED_RESPONSE = "nothing deleted";

  public OwnerController(MongoDatabase database) {
    jacksonCodecRegistry.addCodecForClass(Owner.class);
    ownerCollection = database.getCollection("owners").withDocumentClass(Owner.class)
        .withCodecRegistry(jacksonCodecRegistry);
  }


  public void getOwnerByID(Context ctx) {
    String id = ctx.pathParam("id");
    Owner owner;

    try {
      owner = ownerCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse("The requested owner id wasn't a legal Mongo Object ID.");
    }
    if (owner == null) {
      throw new NotFoundResponse("The requested owner was not found");
    } else {
      ctx.json(owner);
    }
  }


  public void getOwners(Context ctx) {
    ctx.json(ownerCollection.find(new Document()).into(new ArrayList<>()));
  }

  public void addOwner(Context ctx) {

    Owner newOwner = ctx.bodyValidator(Owner.class)
    .check((owner) -> owner.name.length() >= 2 && owner.name.length() <= 300).get();

    ownerCollection.insertOne(newOwner);
    ctx.status(201);
    ctx.json(ImmutableMap.of("id", newOwner._id));
  }

}
