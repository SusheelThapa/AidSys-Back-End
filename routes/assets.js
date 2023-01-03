const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { Assets } = require("../modules/Asset");
const { Tag } = require("../modules/Tag");
const { User } = require("../modules/User");

router.get("/", async (req, res) => {
  try {
    const assets = await Assets.find({})
      .populate("tags", { name: 1, _id: 0 })
      .populate("bookedBy", { _id: 1, username: 1 });

    res.send(assets);
  } catch (error) {
    console.log(error);
  }
  res.end();
});

router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const asset = await Assets.find({ _id })
      .populate("tags", { name: 1, _id: 0 })
      .populate("bookedBy", { _id: 1, username: 1 });

    res.send(asset);
  } catch (error) {
    console.log(error);
  }
  res.end();
});

module.exports = router;
