// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/db.js";

const app = express();

dotenv.config({ path: "./env" });
const port = process.env.PORT || 4040;
connectDB()
  .then(() => {
    app.on("error", function (err) {
      console.error("App is Crashed ! ! !", err);
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB Connection failed ! ! !", err);
  });

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
