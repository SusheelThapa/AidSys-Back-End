const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  studentId: { type: mongoose.ObjectId, ref: "Student", required: false },
  message: String,
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

/**
 * TODO: Need to test createTestimonial
 */

const createTestimonial = async (studentId, message) => {
  try {
    const testimonial = new Testimonial({ studentId, message });

    testimonial.save().then((response) => {
      console.log(`Testimonial from ${studentId} has been saved`);
    });

    return { success: true, error: null, _id: testimonial._id };
  } catch (error) {
    console.log("Some error occured while creating testimonial", error);

    return {
      success: null,
      error: true,
      message: "Error while creating testimonials",
    };
  }
};

const getTestimonial = async () => {
  const testimonial = await Testimonial.find();
  console.log(testimonial);
  return testimonial;
};

module.exports = { Testimonial, getTestimonial, createTestimonial };
