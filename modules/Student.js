const mongoose = require("mongoose");
const _ = require("lodash");

const { encryptPassword, comparePassword } = require("../services/password");
const { createNewAuth } = require("./Auth");

const studentSchema = new mongoose.Schema({
  name: String,
  faculty: String,
  batch: String,
  interest: String,
  bio: String,
  phonenumber: String,
  email: String,
  githubLink: String,
  faceboook: String,
  instagram: String,
  twitter: String,
  authentication: mongoose.ObjectId,
  bookedAssets: [{ type: mongoose.ObjectId, ref: "Assets", required: false }],
  projects: [{ type: mongoose.ObjectId, ref: "Project", required: false }],
});

const Student = mongoose.model("Student", studentSchema);

const createStudent = async (
  name,
  faculty,
  batch,
  interest,
  bio,
  phonenumber,
  email,
  githubLink,
  faceboook,
  instagram,
  twitter,
  username,
  password
) => {
  const authId = await createNewAuth(username, password);

  if (authId === undefined) {
    return {
      success: null,
      error: true,
      message: `${username} and ${password} doesn't match`,
    };
  } else {
    const student = new Student({
      name,
      faculty,
      batch,
      interest,
      bio,
      phonenumber,
      email,
      githubLink,
      faceboook,
      instagram,
      twitter,
    });

    student.authentication = authId;

    student.save();

    return { success: true, error: null, _id: student._id };
  }
};

const getStudent = async (_id) => {
  try {
    const students = await Student.find(
      { _id },
      { password: 0, __v: 0, authentication: 0 }
    )
      .populate("projects", { _id: 0, __v: 0 })
      .populate("bookedAssets", { __v: 0 });

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

module.exports = {
  Student,
  createStudent,
  getStudent,
};
