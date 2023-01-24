const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { getAsset, getAssets, createAssets } = require("../modules/Asset");

router.get("/", async (req, res) => {
  /**
   * To get the list of all the assets present in the database
   */

  const assets = await getAssets();

  res.send(assets);

  res.end();
  ``;
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

router.post("/add", async (req, res) => {
  /**
   * Adding new assets to database
   */

  let { name, totalQuantities } = req.body;

  if (totalQuantities === undefined) {
    totalQuantities = 1;
  }

  const response = await createAssets(name, totalQuantities);

  res.send(response);
  res.end();
});

module.exports = router;
