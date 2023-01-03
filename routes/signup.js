const express = require("express");
const router = express.Router();

const { createUser } = require("../modules/User");

router.post("/", async (req, res) => {
  const { username, password, college, email, phone } = req.body;

  const { success, error, token } = await createUser(
    username,
    password,
    college,
    email,
    phone
  );

  if (success) {
    res.send({ success, token });
  } else {
    res.send({ success, error });
  }
  res.end();
});

module.exports = router;
