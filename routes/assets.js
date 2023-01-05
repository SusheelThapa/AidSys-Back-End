const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { Assets } = require("../modules/Asset");
const { Tag } = require("../modules/Tag");
const { User } = require("../modules/User");

router.get("/", async (req, res) => {
  /**
   * To get the list of all the assets present in the database
   */

  const assets = await Assets.find({}, { __v: 0 })
    .populate("tags", { name: 1, _id: 0 })
    .populate("bookedBy", { _id: 1, username: 1 });

  res.send(assets);

  res.end();
});

router.get("/:_id", async (req, res) => {
  /**
   * TO get the detail fo asset whose id is passed
   */

  const { _id } = req.params;
  const asset = await Assets.find({ _id })
    .populate("tags", { name: 1, _id: 0 })
    .populate("bookedBy", { _id: 1, username: 1 });

  res.send(asset);
  res.end();
});

module.exports = router;
