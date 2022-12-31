require("dotenv").config();

const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { createUser, validateUser } = require("../modules/User");
const { createToken, getTokenData } = require("../services/token");

/**
 * Route for creation of user and sending back the jsonwebtoken
 */
router.post("/createuser", async (req, res) => {
  /**
   * TODO: Validation of the data that is sent in request(i.e username, password,college,email,phone)
   */

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

router.post("/getuser", (req, res) => {
  /**
   * TODO: Verify that the token is there in body
   */

  const { token } = req.body;

  let userDetails = getTokenData(token);
  userDetails = _.pick(userDetails, ["username", "college", "email", "phone"]);

  res.send(userDetails);
  res.end();
});

router.post("/login", async (req, res) => {
  /**
   * TODO: Validation of the data that is sent in request(i.e username, password)
   */
  const { username, password } = await req.body;

  const { success, error, token } = await validateUser(username, password);

  if (success) {
    res.send({ success, token });
  } else {
    res.send({ success, error });
  }

  res.end();
});

module.exports = router;
