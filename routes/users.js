require("dotenv").config();

const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { User } = require("../modules/User");
const { College } = require("../modules/College");
const { Assets } = require("../modules/Asset");

router.get("/", async (req, res) => {
  /**
   * To get the list of all the user avaliable in the database
   */

  const users = await User.find({}, { password: 0, __v: 0 })
    .populate("college", { assets: 0, address: 0, __v: 0 })
    .populate("bookedAssets.asset", { tags: 0, bookedBy: 0, __v: 0 });

  res.send(users);
  res.end();
});

router.get("/:_id", async (req, res) => {
  /**
   * To get the details of user whose id is passed
   */

  const { _id } = req.params;

  const user = await User.find({ _id }, { password: 0, __v: 0 })
    .populate("college", { assets: 0, address: 0, __v: 0 })
    .populate("bookedAssets.asset", { tags: 0, bookedBy: 0, __v: 0 });

  res.send(user);
  res.end();
});

router.post("/bookassets", async (req, res) => {
  /**
   * To book the assets for a particular user.
   * user id will be passed in the request body
   */

  const { userId, bookedAssets } = req.body;

  const user = await User.findOne({ _id: userId }).populate();

  bookedAssets.forEach(async (bookAsset) => {
    /*Save the asset in user collection*/
    user.bookedAssets.push(bookAsset);

    const { asset: _id } = bookAsset;

    const asset = await Assets.findOne({ _id });

    /*Save user details in assets collection*/
    asset.bookedBy.push(userId);

    asset.save();
  });

  user.save();

  /* Filter the data to be send back to client */
  const response = _.pick(user, [
    "_id",
    "username",
    "email",
    "phone",
    "bookedAssets",
    "college",
  ]);

  res.send(response);
  res.end();
});

module.exports = router;
