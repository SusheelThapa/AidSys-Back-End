require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

const getToken = (user) => {
  /**
   * TODO: Validation of the user data that has been received
   * TODO: Dynamically set the expiry date of token after one month of creation
   */

  const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: "30000s" });

  return token;
};

module.exports = getToken;
