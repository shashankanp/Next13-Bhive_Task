import { Schema, model, models } from "mongoose";

const inputSchema = new Schema({
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
  firebase_name: {
    type: String,
  },
  firebase_email: {
    type: String,
  },
  firebase_uid: {
    type: String,
  },
});

const Input = models.Input || model("Input", inputSchema);
export default Input;
