const mongoose = require("mongoose");

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

module.exports = {User};