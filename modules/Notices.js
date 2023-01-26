const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  heading: String,
  date: { type: Date, default: Date.now() },
  description: String,
});

const Notice = mongoose.model("Notice", noticeSchema);

const createNotice = async (heading, description) => {
  const notice = new Notice({ heading, description });

  notice.save();
};

const getNotices = async () => {
  return await Notice.find({}, { __v: 0 });
};
const getNotice = async (_id) => {
  return await Notice.findOne({ _id }, { __v: 0 });
};

module.exports = { Notice, getNotices, createNotice,getNotice };
