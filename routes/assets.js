const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { getAsset, getAssets, createAssets } = require("../modules/Asset");
const { getStudent } = require("../modules/Student");

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

router.post("/book", async (req, res) => {
  const { studentID, assetID } = req.body;

  const student = await getStudent(studentID);
  const asset = await getAsset(assetID);

  student.bookedAssets.unshift(asset._id);
  student.save();

  asset.status = "NotAvailable";
  asset.previousBooking.unshift({ studentID: student._id });
  asset.save();

  res.send({ _id: assetID });
});

router.post("/unbook", async (req, res) => {
  const { studentID, assetID } = req.body;
  const student = await getStudent(studentID);
  const asset = await getAsset(assetID);

  const updatedBookedAssets = [];
  for (let i = 0; i < student.bookedAssets.length; i++) {
    if (student.bookedAssets[i]._id.toString() !== assetID) {
      updatedBookedAssets.push(student.bookedAssets[i]);
    }
  }
  student.bookedAssets = updatedBookedAssets;
  student.save();

  asset.status = "Avaliable";
  asset.save();

  res.send({ _id: assetID });
});

router.post("/review", async (req, res) => {
  const { studentID, assetID, message } = req.body;

  const asset = await getAsset(assetID);

  asset.review.unshift({ studentID, message });

  asset.save();

  res.send({ _id: assetID });
  res.end();
});

module.exports = router;
