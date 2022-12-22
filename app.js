const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
  res.end();
});

app.listen(5000, () => {
  console.log("Listening on Port:5000");
});
