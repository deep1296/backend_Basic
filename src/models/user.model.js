import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
   {
      userName: {
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
      fullName: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,
         index: true,
      },
      avtar: {
         avtar_image: {
            type: String,
            required: true,
         },
         avtar_id: {
            type: String,
            required: true,
         },
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

userSchema.pre("save", async function (next) {
   // we use pre as a plugin or middleware to hash the password before saving in the database
   if (!this.isModified("password")) return next(); // password is not modified then it go next

   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
   );
};

userSchema.methods.generateRefreshToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
   );
};

const User = model("User", userSchema);

export default User;
