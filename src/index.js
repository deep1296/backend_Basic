// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/db.js";

dotenv.config({ path: "./env" });

const app = express();
connectDB()
























/*
(async function () {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", function (err) {
      console.error(err);
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR :", error);
  }
})();
*/
