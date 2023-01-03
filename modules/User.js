const mongoose = require("mongoose");
const _ = require("lodash");

const { encryptPassword, comparePassword } = require("../services/password");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
  college: { type: mongoose.ObjectId, ref: "College", required: false },
  bookedAssets: [
    {
      _id: false,
      asset: { type: mongoose.ObjectId, ref: "Assets", required: false },
      bookedQuantities: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const createUser = async (username, password, email, phone) => {
  const doesUserExit = await User.find({ username });

  if (doesUserExit.length == 0) {
    password = await encryptPassword(password);

    let user = new User({ username, password, email, phone: parseInt(phone) });

    user.save();

    return { success: true, error: null, userId: user._id };
  } else {
    return {
      success: null,
      error: true,
      message: `User with username ${username} already exist`,
    };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find({});

    return { success: true, error: null, users: users };
  } catch (error) {
    console.log(error);

    return { success: null, error: true, users: users };
  }
};

const getUser = async (_id) => {
  /**
   * TODO: If the filter is in json format or not
   */
  try {
    const user = await User.findById(_id);

    return { success: true, error: null, user: user };
  } catch (error) {
    console.log(error);

    return { success: null, error: true, message: "User doesn't exist" };
  }
};

const deleteUser = async (_id) => {
  /**
   * TODO: If the filter is in json format or not
   */

  try {
    const deletedUser = await User.deleteOne(_id);

    return deletedUser.acknowledged
      ? { success: true, error: null }
      : {
          success: null,
          error: true,
          message: "Error while deleting the user",
        };
  } catch (error) {
    console.log(error);

    return {
      success: null,
      error: true,
      message: "Error while deleting the user " + _id,
    };
  }
};

const deleteAllUsers = async () => {
  const users = await User.find({});

  for (user of users) {
    deleteUser(user._id).then((status) => {
      status ? console.log(`User ${user._id} has been deleted`) : "";
    });
  }
  return true;
};

const validateUser = async (username, password) => {
  const user = await User.findOne({ username: username });

  if (user) {
    if (await comparePassword(password, user.password)) {
      return { success: true, error: null, userId: user._id };
    } else {
      return {
        success: null,
        error: true,
        message: "Username and password doesn't match",
      };
    }
  } else {
    return { success: null, error: true, message: "User doesn't exist" };
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
