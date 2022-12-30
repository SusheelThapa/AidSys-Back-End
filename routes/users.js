require("dotenv").config();

const express = require("express");
const router = express.Router();

const { getToken, getTokenData } = require("../services/token");

/**
 * Route for creation of user and sending back the jsonwebtoken
 */
router.post("/createuser", (req, res) => {
  /**
   * TODO: Validation of the data that is sent in request(i.e username, password)
   */

  const { body: user } = req;

  const token = getToken(user);

  res.send({ token: token });
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

module.exports = router;
