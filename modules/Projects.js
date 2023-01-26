const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.ObjectId, ref: "Student", required: true },
  link: { type: String, required: true },
  categories: [{ type: String, required: true }],
  teammember: [{ name: String, link: String }],
});

const Project = mongoose.model("Project", projectSchema);

const createProject = async (
  name,
  description,
  link,
  owner,
  categories,
  teammember
) => {
  try {
    const project = new Project({
      name,
      description,
      link,
      owner,
      categories,
      teammember,
    });

    project.save();

    return { _id: project._id };
  } catch (error) {
    console.log(error);

    return undefined;
  }
};

const getProjects = async () => {
  return await Project.find({}, { __v: 0 });
};

const getProject = async (_id) => {
  return await Project.findOne({ _id }, { __v: 0 });
};

module.exports = { Project, createProject, getProject, getProjects };
