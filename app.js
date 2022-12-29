const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const homepage = require("./routes/homepage.js");

app.use("/", homepage);

app.listen(6000, () => {
  console.log("Listening on Port:5000");
});
