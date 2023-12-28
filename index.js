require("dotenv").config();
const express = require("express");
//import Express from "express"; // module exports ==> Asynchronous code generation//
// to use the express module you have to declare type = module above the script
const app = express();

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

app.get("/deepInfor", (req, res) => {
  res.status(200).json(data);
});
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
