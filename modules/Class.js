const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  notices: [{ type: String, required: false }],
  students: [{ type: mongoose.ObjectId, ref: "User.js", required: false }],
});

const Class = mongoose.model("Class", classSchema);

const createClass = async (name) => {
  try {
    const newClass = new Class({ name });

    newClass.save().then((response) => {
      console.log(`Class ${name} has been created with id ${response._id}`);

      return { success: true, error: nulll, _id: newClass._id };
    });
  } catch (error) {
    console.log("Some error occured while creating college", error);

    return {
      success: null,
      error: true,
      message: "Error while creating class",
    };
  }
};

const addStudent = async (classId, studentId) => {
  try {
    const selectedClass = await Class.find({ _id: classId });
    selectedClass.students.push(studentId);

    selectedClass.save().then((response) => {
      console.log(response);

      return response;
    });
  } catch (error) {
    console.log("Some error occurred while adding student to the class");

    return {
      success: null,
      error: true,
      message: "Error while adding student to the class",
    };
  }
};

module.exports = { Class, addStudent };
