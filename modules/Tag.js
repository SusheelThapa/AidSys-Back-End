const mongoose = require("mongoose");

/**
 * Creating Schema
 */

const tagSchema = new mongoose.Schema({
  name: String,
  assets: [{ type: mongoose.ObjectId, ref: "Assets", required: false }],
});

/**
 * Creating models
 */

const Tag = mongoose.model("Tag", tagSchema);

module.exports = { Tag };
