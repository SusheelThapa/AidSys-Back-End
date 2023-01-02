const mongoose = require("mongoose");
const { User } = require("./User");

/**
 * Creating Schema
 */
const assetsSchema = new mongoose.Schema({
  name: String,
  quantities: Number,
  bookedBy: [{ type: mongoose.ObjectId, ref: "User", required: false }],
});

/**
 * Creating models
 */
const Assets = mongoose.model("Assets", assetsSchema);

const createAssets = async (name, quantities) => {
  const asset = new Assets({ name, quantities });

  asset
    .save()
    .then((response) => {
      console.log(`Assets ${name} has been save with id ${response._id}`);

      return { success: true, error: null };
    })
    .catch((error) => {
      console.log(error);
      return { success: null, error: true };
    });
};

const deleteAllAssets = async () => {
  const assets = await Assets.find();

  for (let asset of assets) {
    deleteAssets(asset._id).then((status) => {
      status ? console.log(`Asset ${asset._id} has been deleted`) : "";
    });
  }
};

const deleteAssets = async (_id) => {
  const response = await Assets.deleteOne(_id );
  return response.acknowledged;
};

module.exports = { createAssets, deleteAssets, deleteAllAssets };
