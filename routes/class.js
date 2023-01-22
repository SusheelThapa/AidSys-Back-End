const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { Class } = require("../modules/Class");

router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const requiredClass = await Class.findOne({ _id });

    res.send({ success: true, error: null, class: requiredClass });
  } catch (error) {
    console.log(
      "Some error has occurred while retrieving the class of particular id"
    );
    return {
      success: null,
      error: true,
      message: "Error while retrieve class of provided id",
    };
  }
});

router.get("/:_id/notices", async (req, res) => {
  try {
    const { _id } = req.params;

    let { notices } = await Class.findOne({ _id });

    notices = _.pick(notices, ["notices"]);
    res.send({ success: true, error: null, notices });
  } catch (error) {
    console.log(
      "Some error has occurred while retrieving the notices class of particular id"
    );

    return {
      success: null,
      error: true,
      message: "Error while retrieving notices of provided class",
    };
  }
});

module.exports = router;
