const mongoose = require("mongoose");
const { Student } = require("./Student");

const assetsSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, default: "Avaliable" },
  previousBooking: [
    {
      studentID: { type: mongoose.ObjectId, ref: "Student", required: false },
      bookedData: Date,
    },
  ],
  rating: { type: Number, default: 96 },
  review: [
    {
      studentID: { type: mongoose.ObjectId, ref: "Student", required: false },
      message: String,
    },
  ],
});

const Assets = mongoose.model("Assets", assetsSchema);

const createAssets = async (name, description) => {
  const asset = new Assets({ name, description });

  asset.save();

  return {
    success: true,
    error: null,
    assetId: asset._id,
  };
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
      .populate("previousBooking.studentID", { name: 1 })
      .populate("review.studentID", { name: 1 });

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
  getAsset,
  getAssets,
};
