const express = require("express");
const router = express.Router();

const { validateStudent } = require("../modules/Student");

router.post("/", async (req, res) => {
  /**
   * To verify the login credential match with database
   */
  const { username, password } = req.body;

  const response = await validateStudent(username, password);

  response.success
    ? res.send({
        success: response.success,
        error: response.error,
        studentID: response._id,
      })
    : res.end({
        success: response.success,
        error: response.error,
        message: response.message,
      });

  res.end();
});

module.exports = router;
