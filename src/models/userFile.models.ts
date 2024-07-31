import { Schema, model } from "mongoose";

const userDataSchema = new Schema({
  username: { type: String, required: true },
  university: { type: String, required: true },
  email: { type: String, required: true },
});

export const UserData = model("UserData", userDataSchema);
