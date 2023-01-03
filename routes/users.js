require("dotenv").config();

const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { User } = require("../modules/User");
const { College } = require("../modules/College");
const { Assets } = require("../modules/Asset");

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  const user = await User.find({ _id }, { password: 0, __v: 0 })
    .populate("college", { assets: 0, address: 0, __v: 0 })
    .populate("bookedAssets.asset", { tags: 0, bookedBy: 0, __v: 0 });

  res.send(user);
  res.end();
});

router.post("/bookassets", async (req, res) => {
  const { userId, bookedAssets } = req.body;
  const user = await User.findOne({ _id: userId }).populate();

  bookedAssets.forEach(async (bookAsset) => {
    // user.bookedAssets.push(bookAsset);

    const { asset: _id, bookedQuantities } = bookAsset;

    const asset = await Assets.findOne({ _id });

    asset.bookedBy.push(userId);
    asset.save();
  });

  user.save();

  res.send(user);
});

module.exports = router;
