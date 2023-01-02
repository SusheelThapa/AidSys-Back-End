const { response } = require("express");
const mongoose = require("mongoose");

/**
 * Creating Schema
 */
const collegeSchema = new mongoose.Schema({
  name: String,
  address: String,
  assests: [{ type: mongoose.ObjectId, ref: "Assests", required: false }],
});

/**
 * Creating models
 */
const College = mongoose.model("College", collegeSchema);

/**
 * CRUD Operations
 */

const createCollege = async (name, address) => {
  const college = new College({ name, address });

  college
    .save()
    .then((response) => {
      console.log(`College ${name} has been created with id ${response._id}`);

      return { success: true, error: null, _id: response._id };
    })
    .catch((error) => {
      console.log(error);
      return { success: null, error: true };
    });

  return college._id;
};

const deleteCollege = async (_id) => {
  const response = await College.deleteOne(_id);
  return response.acknowledged;
};

const deleteAllCollege = async () => {
  const colleges = await College.find();

  for (let college of colleges) {
    deleteCollege(college._id).then((status) => {
      status ? console.log(`College ${college._id} has been deleted`) : "";
    });
  }
};
module.exports = { createCollege, deleteAllCollege, deleteCollege };
