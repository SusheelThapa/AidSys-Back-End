const mongoose = require("mongoose");

const { encryptPassword, comparePassword } = require("../services/password");

const authSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Auth = mongoose.model("Auth", authSchema);

const createNewAuth = async (username, password) => {
  try {
    const authExist = await Auth.find({ username });

    if (authExist.length == 0) {
      password = await encryptPassword(password);

      let auth = new Auth({ username, password });

      auth.save();

      return auth._id;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const validateAuth = async (username, password) => {
  const auth = await Auth.findOne({ username: username });

  if (auth) {
    if (await comparePassword(password, auth.password)) {
      return auth._id;
    } else {
      return undefined;
    }
  }

  return undefined;
};

module.exports = { Auth, createNewAuth, validateAuth };
