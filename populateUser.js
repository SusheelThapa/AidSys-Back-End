const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

/**
 * Connecting to mongodb database
 */
mongoose
  .connect("mongodb://localhost/pratice")
  .then(() => console.log("Successfully connect to mongodb"))
  .catch((err) => console.error("Connection err", err));

/**
 * Creating Schema
 */

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

/**
 * Creating models
 */

const User = mongoose.model("User", userSchema);

