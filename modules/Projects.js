const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  tags: [{ type: String, required: true }],
});

const Project = mongoose.model("Project", projectSchema);

const createProject = async (name, description, link, tags = []) => {
  try {
    const newProject = new Project({ name, description, link, tags });

    newProject.save().then((response) => {
      console.log(`Project ${name} has been created with id ${response._id}`);

      return { success: true, error: nulll, _id: newProject._id };
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

    console.log(projects);

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

module.exports = { Project, createProject, getProjects };