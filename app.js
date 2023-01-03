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
const assets = require("./routes/assets");
const login = require("./routes/login");
const signup = require("./routes/signup");
const colleges = require("./routes/colleges");
const tags = require("./routes/tags");

app.use("/api/users", users);
app.use("/api/assets", assets);
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/colleges", colleges);
app.use("/api/tags", tags);

app.listen(5000, () => {
  console.log("Listening on Port:5000");
});
