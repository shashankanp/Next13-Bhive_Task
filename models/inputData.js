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
});

const Input = models.Input || model("Input", inputSchema);
export default Input;
