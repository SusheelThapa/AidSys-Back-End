const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();

const { connectMongoDB } = require("./services/database");

/*Connecting to database*/
connectMongoDB();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const users = require("./routes/users");

app.use("/api/user", users);

app.listen(5000, () => {
  console.log("Listening on Port:5000");
});
