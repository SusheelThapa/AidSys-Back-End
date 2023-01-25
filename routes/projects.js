const express = require("express");
const router = express.Router();

const { getProjects } = require("../modules/Projects");

router.get("/", async (req, res) => {
  const projects = await getProjects();

  res.send(projects);

  res.end();
});

module.exports = router;
