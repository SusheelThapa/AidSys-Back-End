require("dotenv").config();

const jwt = require("jsonwebtoken");
const express = require("express");
const { createToken, getTokenData } = require("../services/token");
const { Student } = require("../modules/Student");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { studentID } = req.body;

  const token = createToken({ studentID });

  res.send(token);
});

router.post("/data", async (req, res) => {
  const { token } = req.body;

  const data = getTokenData(token);

  const studentIsValid = await Student.find({ _id: data.studentID });

  studentIsValid.length > 0
    ? res.send(data)
    : res.send({ error: true, message: "User doesn't exist" });
});

module.exports = router;
