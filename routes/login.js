const express = require("express");
const router = express.Router();

const { validateUser } = require("../modules/User");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const response = await validateUser(username, password);

  response.success
    ? res.send({
        success: response.success,
        error: response.error,
        userID: response.userId,
      })
    : res.end({
        success: response.success,
        error: response.error,
        message: response.message,
      });

  res.end();
});

module.exports = router;
