const mongoose = require("mongoose");

/**
 * Creating Schema
 */

const tagSchema = new mongoose.Schema({
  name: String,
  tutorials: [{ type: mongoose.ObjectId, ref: "Assests" }],
});

/**
 * Creating models
 */

const Tag = mongoose.model("Tag", tagSchema);
