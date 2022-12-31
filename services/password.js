const bcrypt = require("bcryptjs");

const { BCRYPT_SALT_ROUND } = process.env;

const encryptPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUND));
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    return hashedPassword;
  } catch (error) {
    console.log(plainPassword);
    console.log(error);
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { encryptPassword, comparePassword };
