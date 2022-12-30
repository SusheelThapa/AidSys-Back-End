const mongoose = require("mongoose");

/**
 * Helper function
 */
const { encryptPassword } = require("./services/password");
const { connectMongoDB } = require("./services/database");

/**
 * Database model
 */
const { createUser, deleteAllUsers } = require("./modules/User");

/*Connecting to database*/
connectMongoDB();

const populateUsers = async () => {
  /**
   * Delete all the existing user
   */

  await deleteAllUsers();

  /**
   * Creating and saving user in the database
   */
  createUser("susheelthapa", await encryptPassword("susheelthapa"));

  createUser("neekamaharjan", await encryptPassword("neekamaharjan"));

  createUser("ujjwaljha", await encryptPassword("ujjwaljha"));

  createUser("rounakjha", await encryptPassword("rounakjha"));
};

populateUsers();
