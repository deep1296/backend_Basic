import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullnName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    avtar: {
      type: String, // clodanry URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId, //
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
