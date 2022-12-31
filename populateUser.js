const mongoose = require("mongoose");

/**
 * Helper function
 */
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
  await createUser(
    "susheelthapa",
    "susheelthapa",
    "Pulchowk Campus",
    "077bct090.susheel@pcampus.edu.np",
    "+9770000000000"
  );

  await createUser(
    "neekamaharjan",
    "neekamaharjan",
    "Pulchowk Campus",
    "077bct050.neeka@pcampus.edu.np",
    "+9770000000000"
  );

  await createUser(
    "ujjwaljha",
    "ujjwaljha",
    "Pulchowk Campus",
    "077bct092.ujjwal@pcampus.edu.np",
    "+9770000000000"
  );

  await createUser(
    "rounakjha",
    "rounakjha",
    "Pulchowk Campus",
    "077bct072.rounak@pcampus.edu.np",
    "+9770000000000"
  );
};

populateUsers();
