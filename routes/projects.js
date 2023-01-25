const express = require("express");
const router = express.Router();

const { getProjects, getProject } = require("../modules/Projects");

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

module.exports = router;
