require("dotenv").config();

const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { Student, getStudent } = require("../modules/Student");
const { Assets } = require("../modules/Asset");

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  const student = await getStudent(_id);

  res.send(student);
  res.end();
});

/*TODO: Pachi herxu yesma*/
router.post("/bookassets", async (req, res) => {
  /**
   * To book the assets for a particular student.
   * user id will be passed in the request body
   */

  const { userId, bookedAssets } = req.body;

  const user = await Student.findOne({ _id: userId }).populate();

  bookedAssets.forEach(async (bookAsset) => {
    /*Save the asset in user collection*/
    student.bookedAssets.push(bookAsset);

    const { asset: _id } = bookAsset;

    const asset = await Assets.findOne({ _id });

    /*Save user details in assets collection*/
    asset.bookedBy.push(userId);

    asset.save();
  });

  student.save();

  /* Filter the data to be send back to client */
  const response = _.pick(user, [
    "_id",
    "username",
    "email",
    "phone",
    "bookedAssets",
    "college",
  ]);

  res.send(response);
  res.end();
});

module.exports = router;
