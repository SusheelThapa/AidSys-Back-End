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

const routeList = require("./routes/list");
const students = require("./routes/students");
const assets = require("./routes/assets");
const login = require("./routes/login");
const signup = require("./routes/signup");
const token = require("./routes/token");
const projects = require("./routes/projects");
const notices = require("./routes/notices");

app.use("/", routeList);
app.use("/api/students", students);
app.use("/api/assets", assets);
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/token", token);
app.use("/api/projects", projects);
app.use("/api/notices", notices);

app.listen(5000, () => {
  console.log("Listening on Port:5000");
});
