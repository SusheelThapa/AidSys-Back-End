const express = require("express");
const router = express.Router();

const { validateUser } = require("../modules/User");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const { success, error, token } = await validateUser(username, password);

  if (success) {
    res.send({ success, token });
  } else {
    res.send({ success, error });
  }

  res.end();
});

module.exports = router;
