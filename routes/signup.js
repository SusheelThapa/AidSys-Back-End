const express = require("express");
const router = express.Router();

const { createUser } = require("../modules/User");

router.post("/", async (req, res) => {
  /**
   * create the user based on passed credentials
   */

  const { username, password, college, email, phone } = req.body;

  const user = await createUser(username, password, college, email, phone);

  user.success
    ? res.send({
        success: user.success,
        error: user.error,
        userId: user.userId,
      })
    : res.send({
        success: user.success,
        error: user.error,
        message: user.message,
      });

  res.end();
});

module.exports = router;
