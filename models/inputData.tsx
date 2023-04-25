import { Schema, model, models } from "mongoose";
import User from "./firebaseUser";

const inputSchema = new Schema({
  firebase_uid: {
    type: String,
    ref: User,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  opportunity: {
    type: String,
  },
});

const Input = models.Input || model("Input", inputSchema);
export default Input;
