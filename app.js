require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

const verifyToken = (token) => {
  const tokenData = jwt.verify(token, JWT_SECRET_KEY, (err, tokenData) => {
    /**
     * TODO: Error handling
     */

    return tokenData;
  });

  return tokenData;
};

module.exports = verifyToken;
