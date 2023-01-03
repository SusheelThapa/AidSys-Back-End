const mongoose = require("mongoose");
const _ = require("lodash");

const { encryptPassword, comparePassword } = require("../services/password");
const { createToken } = require("../services/token");

/*<===== Schema and Model =====> */
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
  college: { type: mongoose.ObjectId, ref: "College", required: false },
  bookedAssets: [
    {
      _id: { type: mongoose.ObjectId, ref: "Assets", required: false },
      bookedQuantities: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

/* <===== CRUD OPERATIONS =====> */
const createUser = async (username, password, email, phone) => {
  const doesUserExit = await User.find({ username });

  if (doesUserExit.length == 0) {
    password = await encryptPassword(password);

    phone = parseInt(phone);
    let user = new User({ username, password, email, phone });
    user.save().then(() => {
      console.log(`User ${username} has been created`);
    });

    user = _.pick(user, ["username", "password", "college", "phone", "email"]);

    const token = createToken(user);

    return { success: true, error: null, token, _id: user._id };
  } else {
    return {
      success: null,
      error: `User with username ${username} already exist`,
    };
  }
};

const getAllUsers = async () => {
  const users = await User.find({});

  return users;
};

const getUser = async (_id) => {
  /**
   * TODO: If the filter is in json format or not
   */

  const user = await User.findById(_id);

  return user;
};

const deleteUser = async (_id) => {
  /**
   * TODO: If the filter is in json format or not
   */
  const deletedUser = await User.deleteOne(_id);

  return deletedUser.acknowledged;
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
