require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Assets } = require("./modules/Asset");
const { College } = require("./modules/College");
const { Student } = require("./modules/Student");
const { Tag } = require("./modules/Tag");
const { Class } = require("./modules/Class");
const { Testimonial } = require("./modules/Testimonial");
const { Project } = require("./modules/Projects");

const { BCRYPT_SALT_ROUND } = process.env;

mongoose.set("strictQuery", true);

/*Connecting to database*/
mongoose
  .connect("mongodb://127.0.0.1/aidsys")
  .then(() => console.log("Successfully connect to mongodb"))
  .catch((err) => console.error("Connection err", err));

/*Encrypting password*/
const encryptPassword = (plainPassword) => {
  const salt = bcrypt.genSaltSync(parseInt(BCRYPT_SALT_ROUND));

  const hashedPassword = bcrypt.hashSync(plainPassword, salt);
  return hashedPassword;
};

/*Student Details*/
const studentData = [
  {
    username: "susheelbahadurthapa",
    password: "susheelbahadurthapa",
    email: "077bct090.susheel@pcampus.edu.np",
    phone: "+9770000000000",
  },
  {
    username: "rajitdhakal",
    password: "rajitdhakal",
    email: "077bct090.rajit@pcampus.edu.np",
    phone: "+9770000000000",
  },
  {
    username: "alfabahadurthapa",
    password: "alfabahadurthapa",
    email: "077bct090.alfa@pcampus.edu.np",
    phone: "+9770000000000",
  },
  {
    username: "betabahadurthapa",
    password: "betabahadurthapa",
    email: "077bct090.beta@pcampus.edu.np",
    phone: "+9770000000000",
  },

  {
    username: "betashresbahadurtha",
    password: "betashrestha",
    email: "077bct090.beta@pcampus.edu.np",
    phone: "+9770000000000",
  },
  {
    username: "betashrestha",
    password: "betashrestha",
    email: "077bct090.beta@pcampus.edu.np",
    phone: "+9770000000000",
  },

  {
    username: "susheelthapa",
    password: "susheelthapa",
    email: "077bct090.susheel@pcampus.edu.np",
    phone: "+9770000000000",
  },

  {
    username: "alfathapa",
    password: "alfathapa",
    email: "077bct090.alfa@pcampus.edu.np",
    phone: "+9770000000000",
  },
  {
    username: "betathapa",
    password: "betathapa",
    email: "077bct090.beta@pcampus.edu.np",
    phone: "+9770000000000",
  },
  {
    username: "neekamaharjan",
    password: "neekamaharjan",
    email: "077bct050.neeka@pcampus.edu.np",
    phone: "+9770000000000",
  },
  {
    username: "ujjwaljha",
    password: "ujjwaljha",
    email: "077bct092.ujjwal@pcampus.edu.np",
    phone: "+9770000000000",
  },
  {
    username: "rounakjha",
    password: "rounakjha",
    email: "077bct071.rounak@pcampus.edu.np",
    phone: "+9770000000000",
  },
];

for (let student of studentData) {
  student["password"] = encryptPassword(student["password"]);
}

/*Project Details*/

const projects = [
  {
    name: "VSUS",
    description: "Feel the VSUS, Fall for VSUS",
    link: "https://github.com/Rajendrakhanal/vsus",
    tags: ["Other"],
  },
  {
    name: "A Phone Call",
    description: "Simulation of Call App",
    link: "https://github.com/SusheelThapa/A-Phone-Call",
    tags: ["Other"],
  },
  {
    name: "Fractal Generator",
    description: "Fractal Generator",
    link: "https://github.com/SuprimDevkota/SDL-Projects/tree/main/FractalGenerator",
    tags: ["Other"],
  },
  {
    name: "Sorting Visualizer",
    description: "Visualization of various sorting algorithm",
    link: "https://github.com/SuprimDevkota/SDL-Projects/tree/main/Visualizing-Sorting-Algorithms",
    tags: ["Other"],
  },
  {
    name: "GH-REST",
    description: "Show github data in website using github rest api",
    link: "https://github.com/parikshitadhikari/gh-rest",
    tags: ["Other"],
  },
  {
    name: "Chrome Extension",
    description: "An extension for chrome browser",
    link: "https://github.com/Ujj1225/Chrome-Extension",
    tags: ["Other"],
  },
];
/*Assets Details*/
const assetData = [
  {
    name: "Football Ground",
    quantities: 1,
  },
  {
    name: "Cricket Ground",
    quantities: 1,
  },
  {
    name: "Volleyball Ground",
    quantities: 1,
  },
  {
    name: "Basketball Court",
    quantities: 1,
  },
  {
    name: "Library Hall",
    quantities: 1,
  },
  {
    name: "Table Tennis Board",
    quantities: 3,
  },
  {
    name: "Badminton Court",
    quantities: 2,
  },
  {
    name: "Projector",
    quantities: 10,
  },
];

/*College Details*/
const collegeData = [
  {
    name: "Pulchowk Campus",
    address: "Lalitpur",
    description:
      "Pulchowk Campus is the central campus of the Institute of Engineering. It was established in 1972 (2029 B.S) as one of the constituent campuses of the Institute of Engineering and is situated at the heart of the Lalitpur city at Pulchowk. Initially, it was started for the production of trade-level manpower to fulfill the nation’s need in the field of Engineering. Pulchowk campus offered diploma level (intermediate level with three years duration) courses in various engineering disciplines since 1973 (2030 BS) but diploma level courses are phased out now. Pulchowk campus has been offering bachelor’s degree courses in various engineering disciplines since 1984 (2041 BS).",
    notices: ["Locus", "Locus", "Locus"],
  },
];

/*Tag Details*/
const tagData = [{ name: "Sports" }, { name: "Academics" }];

/*Class Details*/
const classData = [
  { name: "BCT", notices: ["Locus", "Locus", "Locus"] },
  { name: "BEX", notices: ["Locus", "Locus", "Locus"] },
  { name: "BCE", notices: ["Locus", "Locus", "Locus"] },
];

/*Testimonail Details*/

const testimonialData = [
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet placeat, eapossimus dicta ipsam sed illum reprehenderit beatae tempora enim dolor voluptas porro commodi fugit cumque accusantium provident cupiditate eligendi quasi ",
  },
  {
    message:
      "laborum autem! Doloribus earum, iure non nisi perferendis sint amet iusto nequesit est, quod delectus consequuntur quam aspernatur debitis impedit autemtenetur architecto? Quam quod modi porro at nisi quaerat beatae libero",
  },
  {
    message:
      "architecto aliquid expedita, eum soluta corrupti ipsam quisquam eveniet! Velitfugit maxime nulla eligendi laudantium quidem esse quia deserunt nihil temporeiure iste voluptatem nostrum asperiores molestiae quae tenetur consequuntur",
  },
  {
    message:
      "minima, numquam error laboriosam reprehenderit. Corporis, id voluptas eius etatque dolores harum obcaecati animi, quod labore facilis tempore. Repellataliquid laudantium amet dicta, perspiciatis enim qui saepe ullam animi, modi",
  },
];
const populate = async () => {
  /*Remvoing all the college, assets,tags and student detail if available*/
  await College.deleteMany({});
  await Student.deleteMany({});
  await Assets.deleteMany({});
  await Tag.deleteMany({});
  await Class.deleteMany({});
  await Project.deleteMany({});
  await Testimonial.deleteMany({});

  /*Creating student, assets and college details*/
  const susheelbahadurthapa = new Student(studentData[0]);
  const rajitdhakal = new Student(studentData[1]);
  const alfabahadurthapa = new Student(studentData[2]);
  const betabahadurthapa = new Student(studentData[3]);
  const betashresbahadurtha = new Student(studentData[4]);
  const betashrestha = new Student(studentData[5]);
  const susheelthapa = new Student(studentData[6]);
  const alfathapa = new Student(studentData[7]);
  const betathapa = new Student(studentData[8]);
  const neekamaharjan = new Student(studentData[9]);
  const ujjwaljha = new Student(studentData[10]);
  const rounakjha = new Student(studentData[11]);

  const football = new Assets(assetData[0]);
  const cricket = new Assets(assetData[1]);
  const volleyball = new Assets(assetData[2]);
  const basketball = new Assets(assetData[3]);
  const libraryHall = new Assets(assetData[4]);
  const tabletennis = new Assets(assetData[5]);
  const badminton = new Assets(assetData[6]);
  const projector = new Assets(assetData[7]);

  const pulchowk = new College(collegeData[0]);

  const sports = new Tag(tagData[0]);
  const academics = new Tag(tagData[1]);

  const bct = new Class(classData[0]);
  const bex = new Class(classData[1]);
  const bce = new Class(classData[2]);
  const testimonialOne = new Testimonial(testimonialData[0]);
  const testimonialTwo = new Testimonial(testimonialData[1]);
  const testimonialThree = new Testimonial(testimonialData[2]);

  const vsus = new Project(projects[0]);
  const aPhoneCall = new Project(projects[1]);
  const fractalGenerator = new Project(projects[2]);
  const sortingVisualizer = new Project(projects[3]);
  const ghRest = new Project(projects[4]);
  const chromeExtension = new Project(projects[5]);

  /*Saving into the database*/

  susheelbahadurthapa.save();
  rajitdhakal.save();
  alfabahadurthapa.save();
  betabahadurthapa.save();
  betashresbahadurtha.save();
  betashrestha.save();
  susheelthapa.save();
  alfathapa.save();
  betathapa.save();
  neekamaharjan.save();
  ujjwaljha.save();
  rounakjha.save();

  football.save();
  cricket.save();
  volleyball.save();
  basketball.save();
  libraryHall.save();
  tabletennis.save();
  badminton.save();
  projector.save();

  pulchowk.save();

  sports.save();
  academics.save();

  bct.save();
  bex.save();
  bce.save();

  testimonialOne.save();
  testimonialTwo.save();
  testimonialThree.save();

  vsus.save();
  aPhoneCall.save();
  fractalGenerator.save();
  sortingVisualizer.save();
  ghRest.save();
  chromeExtension.save();

  /*Creating relationship*/

  susheelbahadurthapa.college = pulchowk._id;
  rajitdhakal.college = pulchowk._id;
  alfabahadurthapa.college = pulchowk._id;
  betabahadurthapa.college = pulchowk._id;
  betashresbahadurtha.college = pulchowk._id;
  betashrestha.college = pulchowk._id;
  susheelthapa.college = pulchowk._id;
  alfathapa.college = pulchowk._id;
  betathapa.college = pulchowk._id;
  neekamaharjan.college = pulchowk._id;
  ujjwaljha.college = pulchowk._id;
  rounakjha.college = pulchowk._id;

  bct.students = [
    susheelbahadurthapa._id,
    rajitdhakal._id,
    alfabahadurthapa._id,
    betabahadurthapa._id,
  ];

  bex.students = [
    betashresbahadurtha._id,
    betashrestha._id,
    susheelthapa._id,
    alfathapa._id,
  ];

  bce.students = [
    betathapa._id,
    neekamaharjan._id,
    ujjwaljha._id,
    rounakjha._id,
  ];

  pulchowk.assets = [
    football._id,
    cricket._id,
    volleyball._id,
    basketball._id,
    libraryHall._id,
    tabletennis._id,
    badminton._id,
  ];

  academics.assets = [libraryHall._id, projector._id];
  sports.assets = [
    football._id,
    cricket._id,
    volleyball._id,
    basketball._id,
    tabletennis._id,
    badminton._id,
  ];

  susheelthapa.bookedAssets = [
    { bookedQuantities: 1, asset: football._id },
    { bookedQuantities: 1, asset: basketball._id },
    { bookedQuantities: 1, asset: cricket._id },
  ];

  libraryHall.tags = [academics._id];
  football.tags = [sports._id];
  cricket.tags = [sports._id];
  volleyball.tags = [sports._id];
  basketball.tags = [sports._id];
  tabletennis.tags = [sports._id];
  badminton.tags = [sports._id];
  projector.tags = [academics._id];

  testimonialOne.studentId = susheelbahadurthapa._id;
  testimonialTwo.studentId = ujjwaljha._id;
  testimonialThree.studentId = neekamaharjan._id;

  pulchowk.class = [bct._id, bex._id, bce._id];
  pulchowk.testimonials = [
    testimonialOne._id,
    testimonialTwo._id,
    testimonialThree._id,
  ];
  console.log("Done");
};

populate();
