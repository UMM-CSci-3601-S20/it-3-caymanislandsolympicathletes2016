package umm3601.notes;

import java.util.Date;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class Note {

  @ObjectId @Id
  public String _id;
  public String owner_id;
  public String body;
  public boolean posted;
  public boolean pinned;
  public Date timestamp;

}
