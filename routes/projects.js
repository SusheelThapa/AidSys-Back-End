const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProject,
  createProject,
} = require("../modules/Projects");

const { Student } = require("../modules/Student");

router.get("/", async (req, res) => {
  const projects = await getProjects();

  res.send(projects);

  res.end();
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  const project = await getProject(_id);

  res.send(project);

  res.end();
});

router.post("/add", async (req, res) => {
  const { name, description, link, owner, catgories, teammember } = req.body;

  const project = await createProject(
    name,
    description,
    link,
    owner,
    catgories,
    teammember
  );

  const student = await Student.findOne({ _id: owner });

  student.projects.push(project._id);

  student.save();

  res.send(project);
});

module.exports = router;
