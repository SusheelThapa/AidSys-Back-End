const mongoose = require("mongoose");

/**
 * Creating Schema
 */

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

/**
 * Creating models
 */

const User = mongoose.model("User", userSchema);

const createUser = async (username, password) => {
  /**
   * Function to create the user
   */

  const user = new User({ username: username, password: password });

  user.save().then(() => {
    console.log(`User ${username} has been created`);
  });

  return user;
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

module.exports = {
  User,
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  deleteAllUsers,
};
