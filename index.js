require("dotenv").config();
const express = require("express");
//import Express from "express"; // module exports ==> Asynchronous code generation//
// to use the express module you have to declare type = module above the script
//const cors = require("cors");

const app = express();
//app.use(cors());// cors procides the safety for the server it will allow the request which is coming from the same origin only
app.use(express.static("dist")); // we have used build command to build and transformed all the files
// of frontend into the dist folder and serving the build folder from backend and we have used proxy as well after generating the files server is running on the same port
//  proxy : {
//   "/api": "https://backend-basics-rz1f.onrender.com",
// } used in confg file of vite or react == All the requests coming which use the api in it its serving from proxy used.
const data = [
  {
    id: 1,
    name: "<NAME>",
  },
  {
    id: 2,
    name: "<NAME>",
  },
  {
    id: 3,
    name: "<NAME>",
  },
  {
    id: 4,
    name: "<NAME>",
  },
];

app.get("/", (req, res) => {
  res.send("Hello Deep!");
});

app.get("/deep", (req, res) => {
  res.send("<H1>Deeptange<H1/>");
});

app.get("/api/deepInfor", (req, res) => {
  res.status(200).json(data);
});
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
