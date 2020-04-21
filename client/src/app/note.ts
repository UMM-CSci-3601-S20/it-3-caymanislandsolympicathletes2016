export interface Note {
  _id: string;
  owner_id: string;
  body: string;
  posted: boolean;
  timestamp: Date;
}
