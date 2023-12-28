require("dotenv").config();
const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.send("Hello Deep!");
});

app.get("/deep", (req, res) => {
  res.send("<H1>Deeptange<H1/>");
});
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
