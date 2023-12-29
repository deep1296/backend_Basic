import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // to get the request from the selected origin only block other origins... Here you can set your frontend deployed link.
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "16kb" })); // we have set the limit to 16kb more than 16 kb we are not accepting ==> Reason ==> Server crashes
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // to encode the data coming from the request and read it like we use space it is incoded as %20 in url.
app.use(express.static("public")); // suppose any file is coming through the request we can make it static and store in public folder which is created.

// Routes import

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export { app };
