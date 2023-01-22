const express = require("express");
const router = express.Router();

const { College, getColleges, getCollege } = require("../modules/College");

router.get("/", async (req, res) => {
  /**
   * To get list of all the college
   */

  const colleges = await getColleges();

  res.send(colleges);
  res.end();
});

router.get("/:_id", async (req, res) => {
  /**
   * To get details of the college whose id is passed
   */

  const { _id } = req.params;

  const college = await getCollege(_id);

  res.send(college);
  res.end();
});

module.exports = router;
