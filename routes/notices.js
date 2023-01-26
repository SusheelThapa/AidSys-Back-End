const express = require("express");
const router = express.Router();

const { getNotices, createNotice, getNotice } = require("../modules/Notices");

router.post("/add", async (req, res) => {
  const { heading, description } = req.body;

  const notice = await createNotice(heading, description);

  res.send({ notice });
});

router.get("/", async (req, res) => {
  const notices = await getNotices();
  res.send(notices);
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  const notice = await getNotice(_id);
  res.send(notice);
});

module.exports = router;
