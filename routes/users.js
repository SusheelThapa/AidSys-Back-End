require("dotenv").config();

const express = require("express");
const { createUser, validateUser } = require("../modules/User");
const router = express.Router();

const { getToken, getTokenData } = require("../services/token");

/**
 * Route for creation of user and sending back the jsonwebtoken
 */
router.post("/createuser", async (req, res) => {
  /**
   * TODO: Validation of the data that is sent in request(i.e username, password)
   */

  const { username, password } = req.body;

  const token = getToken({ username, password });

  const { success, error } = await createUser(username, password);

  if (success) {
    res.send({ success, token });
  } else {
    res.send({ success, error });
  }
  res.end();
});

router.post("/getuser", (req, res) => {
  /**
   * TODO: Verify that the token is there in body
   */

  const { token } = req.body;

  const userDetails = getTokenData(token);

  res.send(userDetails);
  res.end();
});

router.post("/login", async (req, res) => {
  /**
   * TODO: Validation of the data that is sent in request(i.e username, password)
   */
  const { username, password } = await req.body;

  const { success, error } = await validateUser(username, password);

  const token = getToken({ username, password });

  if (success) {
    res.send({ success, token });
  } else {
    res.send({ success, error });
  }

  res.end();
});

module.exports = router;
