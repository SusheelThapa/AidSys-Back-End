const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(morgan("dev"));

const homepage = require("./routes/homepage.js");

app.use("/", homepage);

app.listen(5000, () => {
  console.log("Listening on Port:5000");
});
