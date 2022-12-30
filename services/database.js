const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectMongoDB = () => {
  /**
   * Connecting to mongodb database
   */
  mongoose
    .connect("mongodb://localhost/pratice")
    .then(() => console.log("Successfully connect to mongodb"))
    .catch((err) => console.error("Connection err", err));
};

module.exports = { connectMongoDB };
