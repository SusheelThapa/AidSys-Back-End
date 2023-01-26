const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  tags: [{ type: String, required: true }],
  member: [{ name: String, link: String }],
});

const Project = mongoose.model("Project", projectSchema);

const createProject = async (name, description, link, tags ,member) => {
  try {
    const newProject = new Project({ name, description, link, tags,member });

    newProject.save().then((response) => {
      console.log(`Project ${name} has been created with id ${response._id}`);

      return { success: true, error: null, _id: newProject._id };
    });
  } catch (error) {
    console.log(error);

    return {
      success: null,
      error: true,
      message: "Error while create project",
    };
  }
};

const getProjects = async () => {
  try {
    const projects = await Project.find({}, { __v: 0 });

    return { success: true, error: null, projects };
  } catch (error) {
    console.log(error);
    return {
      success: null,
      error: true,
      message: "Error while  getting list of all the project",
    };
  }
};

const getProject = async (_id) => {
  try {
    const project = await Project.find({ _id }, { __v: 0 });

    return { success: true, error: null, project };
  } catch (error) {
    console.log(error);
    return {
      success: null,
      error: true,
      message: "Error while  getting list of all the project",
    };
  }
};

module.exports = { Project, createProject, getProjects, getProject };
