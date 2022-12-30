const mongoose = require("mongoose");

/**
 * Creating Schema
 */

const collegeSchema = new mongoose.Schema({
  name: String,
  address: String,
  assests: [{ type: mongoose.ObjectId, ref: "Assests" }],
});

/**
 * Creating models
 */

const College = mongoose.model("College", collegeSchema);
