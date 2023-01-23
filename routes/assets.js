const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { getAsset, getAssets } = require("../modules/Asset");

router.get("/", async (req, res) => {
  /**
   * To get the list of all the assets present in the database
   */

  const assets = await getAssets();

  res.send(assets);

  res.end();``
});

router.get("/:_id", async (req, res) => {
  /**
   * TO get the detail fo asset whose id is passed
   */

  const { _id } = req.params;
  const asset = await getAsset(_id);

  res.send(asset);
  res.end();
});

module.exports = router;
