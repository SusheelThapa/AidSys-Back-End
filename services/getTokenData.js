const verifyToken = require("./verfiyToken");

const getTokenData = (token) => {
  const { user } = verifyToken(token);

  return user;
};

module.exports = getTokenData;
