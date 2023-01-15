require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

const createToken = (data) => {
  /**
   * Function to create token based on user data
   */

  /**
   * TODO: Validation of the user data that has been received
   * TODO: Dynamically set the expiry date of token after one month of creation
   */

  const token = jwt.sign({ data }, JWT_SECRET_KEY, { expiresIn: "30000s" });

  return token;
};

const getTokenData = (token) => {
  /**
   * Function to retrieve data from the token
   */
  const { data: tokenData } = verifyToken(token);
  return tokenData;
};

const verifyToken = (token) => {
  /**
   * Function to verify token and
   * send the data from the token
   */

  const tokenData = jwt.verify(token, JWT_SECRET_KEY, (err, tokenData) => {
    if (!err) return { success: true, error: null, data: tokenData.data };
    return { success: null, error: true, data: err.message };
  });

  return tokenData;
};

module.exports = { getTokenData, createToken };
