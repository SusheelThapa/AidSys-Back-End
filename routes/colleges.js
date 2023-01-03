const express = require("express");
const { College } = require("../modules/College");
const router = express.Router();

router.get("/", async (req, res) => {
  const colleges = await College.find({}, { _id: 1, name: 1 });

  res.send(colleges);
  res.end();
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  const college = await College.find({ _id }, { _id: 1, name: 1 });

  res.send(college);
  res.end();
});

module.exports = router;
