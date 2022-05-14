import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("User", Schema);