const mongoose = require("mongoose");
const _ = require("lodash");

const { encryptPassword, comparePassword } = require("../services/password");
const { createToken } = require("../services/token");

/**
 * Creating Schema
 */
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
  college: { type: mongoose.ObjectId, ref: "College", required: false },
  bookedAssets: [{ type: mongoose.ObjectId, ref: "Assets", required: false }],
});

/**
 * Creating models
 */
const User = mongoose.model("User", userSchema);

const createUser = async (username, password, email, phone) => {
  const doesUserExit = await getUser({ username });

  if (doesUserExit.length == 0) {
    password = await encryptPassword(password);

    let user = new User({ username, password, email, phone });

    user.save().then(() => {
      console.log(`User ${username} has been created`);
    });

    user = _.pick(user, ["username", "password", "college", "phone", "email"]);

    const token = createToken(user);

    return { success: true, error: null, token };
  } else {
    return {
      success: null,
      error: `User with username ${username} already exist`,
    };
  }
};

const getAllUsers = async () => {
  /**
   * Function to get all the user
   */
  const users = await User.find({});

  return users;
};

const getUser = async (filter) => {
  /**
   * Function to get particular the user
   */

  /**
   * TODO: If the filter is in json format or not
   */

  const user = await User.find(filter);

  return user;
};

const deleteUser = async (_id) => {
  /**
   * Function to delete particular user
   */

  /**
   * TODO: If the filter is in json format or not
   */
  const deletedUser = await User.deleteOne(_id);

  return deletedUser.acknowledged;
};

const deleteAllUsers = async () => {
  /**
   * Function to delete all particular user
   */

  const users = await User.find({});

  for (user of users) {
    deleteUser(user._id).then((status) => {
      status ? console.log(`User ${user._id} has been deleted`) : "";
    });
  }
  return true;
};

const validateUser = async (username, password) => {
  /**
   * Validate if the user exist in database or not
   */
  const user = await User.findOne({ username: username }, { _id: 0 });

  if (user) {
    if (await comparePassword(password, user.password)) {
      const token = createToken(user);

      return { success: true, error: null, token };
    } else {
      return { success: null, error: "Username and password doesn't match" };
    }
  } else {
    return { success: null, error: "User doesn't exist" };
  }
};

module.exports = {
  User,
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  deleteAllUsers,
  validateUser,
};
