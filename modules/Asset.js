const mongoose = require("mongoose");

/**
 * Creating Schema
 */
const assestsSchema = new mongoose.Schema({
  name: String,
  tags: [{ type: mongoose.ObjectId, ref: "Tags" }],
});


/**
 * Creating models
 */
const Assests = mongoose.model("Assests", assestsSchema);
