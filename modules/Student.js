const mongoose = require("mongoose");
const _ = require("lodash");

const { encryptPassword, comparePassword } = require("../services/password");

const studentSchema = new mongoose.Schema({
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

const Student = mongoose.model("Student", studentSchema);

const createStudent = async (username, password, email, phone) => {
  const doesStudentExist = await Student.find({ username });

  if (doesStudentExist.length == 0) {
    password = await encryptPassword(password);

    let student = new Student({
      username,
      password,
      email,
      phone: parseInt(phone),
    });

    student.save();

    return { success: true, error: null, studentId: student._id };
  } else {
    return {
      success: null,
      error: true,
      message: `Student with username ${username} already exist`,
    };
  }
};

const getAllStudents = async () => {
  try {
    const students = await Student.find({}, { password: 0, __v: 0 })
      .populate("college", { assets: 0, address: 0, __v: 0 })
      .populate("bookedAssets.asset", { tags: 0, bookedBy: 0, __v: 0 });

    return { success: true, error: null, students: students };
  } catch (error) {
    console.log(error);

    return {
      success: null,
      error: true,
      message: "Error while retrieving details about students",
    };
  }
};

const getStudent = async (_id) => {
  /**
   * TODO: If the filter is in json format or not
   */
  try {
    const student = await Student.find({ _id }, { password: 0, __v: 0 })
      .populate("college", { assets: 0, address: 0, __v: 0 })
      .populate("bookedAssets.asset", { tags: 0, bookedBy: 0, __v: 0 });

    return { success: true, error: null, student: student };
  } catch (error) {
    console.log(error);

    return { success: null, error: true, message: "User doesn't exist" };
  }
};
/**
 * TODO: Need to check delete function via route
 */

const deleteStudent = async (_id) => {
  /**
   * TODO: If the filter is in json format or not
   */

  try {
    const deletedStudent = await Student.deleteOne(_id);

    return deletedStudent.acknowledged
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

const deleteAllStudent = async () => {
  const students = await Student.find({});

  for (student of students) {
    deleteStudent(student._id).then((status) => {
      status ? console.log(`User ${student._id} has been deleted`) : "";
    });
  }
  return true;
};

const validateStudent = async (username, password) => {
  const user = await Student.findOne({ username: username });

  if (user) {
    if (await comparePassword(password, Student.password)) {
      return { success: true, error: null, userId: Student._id };
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
  Student,
  createStudent,
  getStudent,
  getAllStudents,
  deleteStudent,
  deleteAllStudent,
  validateStudent,
};
