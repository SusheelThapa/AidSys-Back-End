require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Assets } = require("./modules/Asset");
const { College } = require("./modules/College");
const { User } = require("./modules/User");
const { Tag } = require("./modules/Tag");

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

/*User Details*/
const userData = [
  {
    username: "susheelthapa",
    password: "susheelthapa",
    email: "077bct090.susheel@pcampus.edu.np",
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

for (let user of userData) {
  user["password"] = encryptPassword(user["password"]);
}

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
const collegeData = [{ name: "Pulchowk Campus", address: "Lalitpur" }];

/*Tag Details*/
const tagData = [{ name: "Sports" }, { name: "Academics" }];

const populate = async () => {
  /*Remvoing all the college, assets,tags and user detail if available*/
  await College.deleteMany({});
  await User.deleteMany({});
  await Assets.deleteMany({});
  await Tag.deleteMany({});

  /*Creating user, assets and college details*/
  const susheel = new User(userData[0]);
  const neeka = new User(userData[1]);
  const ujjwal = new User(userData[2]);
  const rounak = new User(userData[3]);

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

  /*Saving into the database*/
  susheel.save();
  neeka.save();
  ujjwal.save();
  rounak.save();

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

  /*Creating relationship*/

  susheel.college = pulchowk._id;
  neeka.college = pulchowk._id;
  rounak.college = pulchowk._id;
  ujjwal.college = pulchowk._id;

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

  libraryHall.tags = [academics._id];
  football.tags = [sports._id];
  cricket.tags = [sports._id];
  volleyball.tags = [sports._id];
  basketball.tags = [sports._id];
  tabletennis.tags = [sports._id];
  badminton.tags = [sports._id];
  projector.tags = [academics._id];

  susheel.bookedAssets = [
    { asset: football._id, bookedQuantities: 1 },
    { asset: basketball._id, bookedQuantities: 1 },
  ];
  football.bookedBy = [susheel._id];
  basketball.bookedBy = [susheel._id];

  neeka.bookedAssets = [
    { asset: badminton._id, bookedQuantities: 1 },
    { asset: tabletennis._id, bookedQuantities: 1 },
  ];
  football.bookedBy = [neeka._id];
  basketball.bookedBy = [neeka._id];

  ujjwal.bookedAssets = [
    { asset: cricket._id, bookedQuantities: 1 },
    { asset: volleyball._id, bookedQuantities: 1 },
  ];
  cricket.bookedBy = [ujjwal._id];
  volleyball.bookedBy = [ujjwal._id];

  rounak.bookedAssets = [
    { asset: libraryHall._id, bookedQuantities: 1 },
    { asset: tabletennis._id, bookedQuantities: 1 },
  ];
  libraryHall.bookedBy = [rounak._id];
  tabletennis.bookedBy = [rounak._id];

  console.log("Done");
};

populate();
