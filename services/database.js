require("dotenv").config();

const mongoose = require("mongoose");

const { DATABASE } = process.env;

mongoose.set("strictQuery", true);

const connectMongoDB = () => {
  /**
   * Connecting to mongodb database
   */
  mongoose
    .connect("mongodb://localhost/" + DATABASE)
    .then(() =>
      console.log("Successfully connect to " + DATABASE + " database")
    )
    .catch((err) => console.error("Connection err", err));
};

module.exports = { connectMongoDB };
