const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
  res.end();
});

app.listen(5000, () => {
  console.log("Listening on Port:5000");
});
