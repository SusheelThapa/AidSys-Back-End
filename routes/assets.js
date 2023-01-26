const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { getAsset, getAssets, createAssets } = require("../modules/Asset");

router.get("/", async (req, res) => {
  const assets = await getAssets();

  res.send(assets);

  res.end();
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  const asset = await getAsset(_id);

  res.send(asset);
  res.end();
});

router.post("/add", async (req, res) => {
  let { name, description } = req.body;

  const response = await createAssets(name, description);

  res.send(response);
  res.end();
});

module.exports = router;
