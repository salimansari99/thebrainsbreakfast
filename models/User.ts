import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: String,
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
});

export default models.User || model("User", UserSchema);
