import { Schema, model, models } from "mongoose";

const firebaseSchema = new Schema({
  firebase_name: {
    type: String,
    unique: true,
  },
  firebase_mail: {
    type: String,
    unique: true,
  },
  firebase_uid: {
    type: String,
    unique: true,
  },
  display_pic: {
    type: String,
  },
});

const User = models.User || model("User", firebaseSchema);
export default User;
