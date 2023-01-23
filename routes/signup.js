const express = require("express");
const router = express.Router();

const { createStudent } = require("../modules/Student");

router.post("/", async (req, res) => {
  /**
   * create the user based on passed credentials
   */

  const { username, password, college, email, phone } = req.body;

  const student = await createStudent(username, password, college, email, phone);

  student.success
    ? res.send({
        success: student.success,
        error: student.error,
        studentId: student._id,
      })
    : res.send({
        success: student.success,
        error: student.error,
        message: student.message,
      });

  res.end();
});

module.exports = router;
