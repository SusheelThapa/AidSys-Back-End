const mongoose = require("mongoose");

/**
 * Helper function
 */
const { encryptPassword, comparePassword } = require("./services/password");
const { connectMongoDB } = require("./services/database");

/**
 * Database model
 */
const User = require("./modules/User");

/*Connecting to database*/
connectMongoDB();
