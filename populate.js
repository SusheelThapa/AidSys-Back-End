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

const collegeSchema = new mongoose.Schema({
  name: String,
  address: String,
  assests: [{ type: mongoose.ObjectId, ref: "Assests" }],
});

const assestsSchema = new mongoose.Schema({
  name: String,
  tags: [{ type: mongoose.ObjectId, ref: "Tags" }],
});

const tagSchema = new mongoose.Schema({
  name: String,
  tutorials: [{ type: mongoose.ObjectId, ref: "Assests" }],
});

/**
 * Creating models
 */

const College = mongoose.model("College", collegeSchema);

const Assests = mongoose.model("Assests", assestsSchema);

const Tag = mongoose.model("Tag", tagSchema);
