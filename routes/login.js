const express = require("express");
const router = express.Router();

const { validateStudent, Student } = require("../modules/Student");
const { validateAuth } = require("../modules/Auth");

router.post("/", async (req, res) => {
  /**
   * To verify the login credential match with database
   */
  const { username, password } = req.body;

  const authId = await validateAuth(username, password);

  if (authId === undefined) {
    res.send({
      success: null,
      error: true,
      message: "Username and password doesn't match",
    });
  } else {
    const student = await Student.findOne(
      { authentication: authId },
      { _id: 1 }
    );
    res.send({ _id: student._id });
  }

  res.end();
});

module.exports = router;
