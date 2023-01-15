const express = require("express");
const { Tag } = require("../modules/Tag");
const router = express.Router();

router.get("/", async (req, res) => {
  /**
   * To get the list of all the tags in the database
   */

  const tags = await Tag.find({}, { _id: 1, name: 1 });

  res.send(tags);
  res.end();
});

module.exports = router;
