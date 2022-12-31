const mongoose = require("mongoose");
const { comparePassword } = require("../services/password");

/**
 * Creating Schema
 */

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  college: String,
  email: String,
  phone: String,
});

/**
 * Creating models
 */

const User = mongoose.model("User", userSchema);

const createUser = async (username, password, college, email, phone) => {
  /**
   * Function to create the user
   */
  const doesUserExit = await getUser({ username: username });

  if (doesUserExit.length == 0) {
    const user = new User({ username, password, college, email, phone });

    user.save().then(() => {
      console.log(`User ${username} has been created`);
    });

    return { success: true, error: null };
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
   * Function to get all the user
   */

  /**
   * TODO: If the filter is in json format or not
   */

  const user = await User.find(filter);

  return user;
};

const deleteUser = async (filter) => {
  /**
   * Function to delete particular user
   */

  /**
   * TODO: If the filter is in json format or not
   */
  const deletedUser = await User.deleteOne(filter);

  return deletedUser.acknowledged;
};

const deleteAllUsers = async () => {
  /**
   * Function to delete all particular user
   */

  try {
    const users = await User.find({});

    for (user of users) {
      if (await deleteUser(user)) {
        console.warn(`User ${user.username} has been removed`);
      }
    }
    return true;
  } catch (err) {
    console.error(err);
  }
};

const validateUser = async (username, password) => {
  /**
   * Validate if the user exist in database or not
   */
  const user = await User.findOne(
    { username: username },
    { username: 1, password: 1, _id: 0 }
  );

  if (user) {
    if (await comparePassword(password, user.password)) {
      return { success: true, error: null };
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
