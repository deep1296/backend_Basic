import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
   try {
      const connectionInstace = await mongoose.connect(
         `${process.env.MONGODB_URI}/${DB_NAME}`
      );
      console.log(`Connecting to ${connectionInstace.connection.host}`);
      //console.log(connectionInstace)
   } catch (error) {
      console.error("MongoDB connect failed", error);
      process.exit(1);
   }
};
