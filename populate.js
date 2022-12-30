const mongoose = require("mongoose");

/**
 * Helper function
 */
const { connectMongoDB } = require("./services/database");

/**
 * Database model
 */
const College = require("./modules/College");
const Tag = require("./modules/Tag");
const Asset = require("./modules/Asset");

/*Connecting to database*/
connectMongoDB();
