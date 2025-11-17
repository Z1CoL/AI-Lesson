import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    id: Schema.ObjectId,
    name: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
