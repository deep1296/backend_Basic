require("dotenv").config();
const express = require("express");
const app = express();

const data = {
  name: "Deep",
  age: 25,
};

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
