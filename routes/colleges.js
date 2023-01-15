const express = require("express");
const router = express.Router();

const { College } = require("../modules/College");

router.get("/", async (req, res) => {
  /**
   * To get list of all the college
   */

  const colleges = await College.find({}, { _id: 1, name: 1 });

  res.send(colleges);
  res.end();
});

router.get("/:_id", async (req, res) => {
  /**
   * To get details of the college whose id is passed
   */

  const { _id } = req.params;

  const college = await College.find({ _id }, { _id: 1, name: 1 });

  res.send(college);
  res.end();
});

module.exports = router;
