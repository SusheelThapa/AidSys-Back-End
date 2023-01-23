const mongoose = require("mongoose");
const { Tag } = require("./Tag");
const { Student } = require("./Student");

/*<===== SCHEMA AND MODEL =====> */
const assetsSchema = new mongoose.Schema({
  name: String,
  totalQuantities: Number,
  tags: [{ type: mongoose.ObjectId, ref: "Tag", required: false }],
  bookedBy: [{ type: mongoose.ObjectId, ref: "Student", required: false }],
});

const Assets = mongoose.model("Assets", assetsSchema);

/* <===== CRUD OPERATION=====> */
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
  const response = await Assets.deleteOne(_id);
  return response.acknowledged;
};

const getAssets = async () => {
  try {
    const assets = await Assets.find({}, { __v: 0 });

    return {
      success: true,
      error: null,
      assets,
    };
  } catch (error) {
    console.log(error);

    return {
      success: null,
      error: true,
      message: "Error occured while retrieving list of all the assets",
    };
  }
};

const getAsset = async (_id) => {
  try {
    const asset = await Assets.findOne({ _id }, { __v: 0 })
      .populate("tags", { name: 1, _id: 0 })
      .populate("bookedBy", { _id: 1, username: 1 });

    return {
      success: true,
      error: null,
      asset,
    };
  } catch (error) {
    console.log(error);

    return {
      success: null,
      error: true,
      message: "Error occured while retrieving list of all the assets",
    };
  }
};
module.exports = {
  Assets,
  createAssets,
  deleteAssets,
  deleteAllAssets,
  getAsset,
  getAssets,
};
