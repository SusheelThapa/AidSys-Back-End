const mongoose = require("mongoose");

/* <==== SCHEMA AND MODELS ====> */
const collegeSchema = new mongoose.Schema({
  name: String,
  address: String,
  assets: [{ type: mongoose.ObjectId, ref: "Assests", required: false }],
});

const College = mongoose.model("College", collegeSchema);

/* <==== CRUD OPERATIONS ====> */
const createCollege = async (name, address) => {
  try {
    const college = new College({ name, address });

    college.save().then((response) => {
      console.log(`College ${name} has been created with id ${response._id}`);
    });

    return { success: true, error: null, _id: college._id };
  } catch (error) {
    console.log("Some error occured while creating college", error);

    return {
      success: null,
      error: true,
      message: "Error while creating college",
    };
  }
};

const deleteCollege = async (_id) => {
  try {
    const response = await College.deleteOne(_id);

    return response.acknowledged
      ? { success: true, error: null, _id }
      : { success: null, error: true, message: "Unable to delete college" };
  } catch (error) {
    console.log("Some error occured while deleting college", error);

    return {
      success: null,
      error: true,
      message: "Error while creating college",
    };
  }
};

const deleteAllCollege = async () => {
  /**
   * Wrap inside try...catch block
   * Return better json response
   */
  const colleges = await College.find();

  for (let college of colleges) {
    deleteCollege(college._id).then((status) => {
      status ? console.log(`College ${college._id} has been deleted`) : "";
    });
  }
};

module.exports = { College, createCollege, deleteAllCollege, deleteCollege };
