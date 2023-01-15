require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const { createToken, getTokenData } = require("../services/token");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { userID } = req.body;

  const token = createToken({ userID });

  res.send(token);
});

router.post("/data", (req, res) => {
  const { token } = req.body;

  const data = getTokenData(token);

  res.send(data);
});

module.exports = router;
