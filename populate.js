require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Assets } = require("./modules/Asset");
const { Auth } = require("./modules/Auth");
const { Notice } = require("./modules/Notices");
const { Project } = require("./modules/Projects");
const { Student, createStudent } = require("./modules/Student");

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
const students = [
  {
    name: "John Doe",
    faculty: "Computer Science",
    batch: 2022,
    interest: "Artificial Intelligence",
    bio: "A computer science student with a passion for AI.",
    phonenumber: "+977-981-123-4567",
    email: "johndoe@email.com",
    githubLink: "johndoe",
    faceboook: "johndoe",
    instagram: "johndoe",
    twitter: "johndoe",
    username: "johndoe",
    password: "johndoe",
  },
  {
    name: "Jane Smith",
    faculty: "Business",
    batch: 2022,
    interest: "Entrepreneurship",
    bio: "A business student with an interest in starting her own company.",
    phonenumber: "+977-982-234-5678",
    email: "janesmith@email.com",
    githubLink: "janesmith",
    faceboook: "janesmith",
    instagram: "janesmith",
    twitter: "janesmith",
    username: "janesmith",
    password: "janesmith",
  },
  {
    name: "Bob Johnson",
    faculty: "Engineering",
    batch: 2021,
    interest: "Robotics",
    bio: "An engineering student with a focus on robotics.",
    phonenumber: "+977-983-345-6789",
    email: "bobjohnson@email.com",
    githubLink: "bobjohnson",
    faceboook: "bobjohnson",
    instagram: "bobjohnson",
    twitter: "bobjohnson",
    username: "bobjohnson",
    password: "bobjohnson",
  },
  {
    name: "Michael Brown",
    faculty: "Computer Science",
    batch: 2022,
    interest: "Machine Learning",
    bio: "A computer science student with an interest in machine learning.",
    phonenumber: "+977-981-234-5678",
    email: "michaelbrown@email.com",
    githubLink: "michaelbrown",
    faceboook: "michaelbrown",
    instagram: "michaelbrown",
    twitter: "michaelbrown",
    username: "michaelbrown",
    password: "michaelbrown",
  },
  {
    name: "Emily Davis",
    faculty: "Business",
    batch: 2022,
    interest: "Marketing",
    bio: "A business student with a focus on marketing.",
    phonenumber: "+977-982-345-6789",
    email: "emilydavis@email.com",
    githubLink: "emilydavis",
    faceboook: "emilydavis",
    instagram: "emilydavis",
    twitter: "emilydavis",
    username: "emilydavis",
    password: "emilydavis",
  },
  {
    name: "Joshua Garcia",
    faculty: "Engineering",
    batch: 2021,
    interest: "Civil Engineering",
    bio: "An engineering student with an interest in civil engineering.",
    phonenumber: "+977-983-456-7890",
    email: "joshuagarcia@email.com",
    githubLink: "joshuagarcia",
    faceboook: "joshuagarcia",
    instagram: "joshuagarcia",
    twitter: "joshuagarcia",
    username: "joshuagarcia",
    password: "joshuagarcia",
  },
  {
    name: "Matthew Rodriguez",
    faculty: "Computer Science",
    batch: 2022,
    interest: "Cybersecurity",
    bio: "A computer science student with a focus on cybersecurity.",
    phonenumber: "+977-981-345-6789",
    email: "matthewrodriguez@email.com",
    githubLink: "matthewrodriguez",
    faceboook: "matthewrodriguez",
    instagram: "matthewrodriguez",
    twitter: "matthewrodriguez",
    username: "matthewrodriguez",
    password: "matthewrodriguez",
  },
  {
    name: "Olivia Turner",
    faculty: "Business",
    batch: 2022,
    interest: "Human Resources",
    bio: "A business student with an interest in human resources.",
    phonenumber: "+977-982-456-7890",
    email: "oliviaturner@email.com",
    githubLink: "oliviaturner",
    faceboook: "oliviaturner",
    instagram: "oliviaturner",
    twitter: "oliviaturner",
    username: "oliviaturner",
    password: "oliviaturner",
  },
  {
    name: "David Lewis",
    faculty: "Engineering",
    batch: 2021,
    interest: "Electrical Engineering",
    bio: "An engineering student with a focus on electrical engineering.",
    phonenumber: "+977-983-567-8901",
    email: "davidlewis@email.com",
    githubLink: "davidlewis",
    faceboook: "davidlewis",
    instagram: "davidlewis",
    twitter: "davidlewis",
    username: "davidlewis",
    password: "davidlewis",
  },
  {
    name: "James Green",
    faculty: "Computer Science",
    batch: 2022,
    interest: "Game Development",
    bio: "A computer science student with an interest in game development.",
    phonenumber: "+977-981-456-7890",
    email: "jamesgreen@email.com",
    githubLink: "jamesgreen",
    faceboook: "jamesgreen",
    instagram: "jamesgreen",
    twitter: "jamesgreen",
    username: "jamesgreen",
    password: "jamesgreen",
  },
  {
    name: "Benjamin Baker",
    faculty: "Business",
    batch: 2022,
    interest: "Finance",
    bio: "A business student with a focus on finance.",
    phonenumber: "+977-982-567-8901",
    email: "benjaminbaker@email.com",
    githubLink: "benjaminbaker",
    faceboook: "benjaminbaker",
    instagram: "benjaminbaker",
    twitter: "benjaminbaker",
    username: "benjaminbaker",
    password: "benjaminbaker",
  },
  {
    name: "Brandon Cooper",
    faculty: "Engineering",
    batch: 2021,
    interest: "Chemical Engineering",
    bio: "An engineering student with an interest in chemical engineering.",
    phonenumber: "+977-983-443-3434",
    email: "brandoncooper234@gmail.com",
    githubLink: "brandoncooper",
    faceboook: "brandon",
    instagram: "brandon",
    twitter: "brandon",
    username: "brandon",
    password: "brandon",
  },
  {
    name: "Abraham Lincoln",
    faculty: "Computer Science",
    batch: 2022,
    interest: "Natural Language Processing",
    bio: "A computer science student with an interest in natural language processing.",
    phonenumber: "+977-981-111-2222",
    email: "alincoln@email.com",
    githubLink: "alincoln",
    faceboook: "alincoln",
    instagram: "alincoln",
    twitter: "alincoln",
    username: "alincoln",
    password: "alincoln",
  },
  {
    name: "Barbara Martinez",
    faculty: "Business",
    batch: 2022,
    interest: "Supply Chain Management",
    bio: "A business student with a focus on supply chain management.",
    phonenumber: "+977-982-222-3333",
    email: "bmartinez@email.com",
    githubLink: "bmartinez",
    faceboook: "bmartinez",
    instagram: "bmartinez",
    twitter: "bmartinez",
    username: "bmartinez",
    password: "bmartinez",
  },
  {
    name: "Carlos Rodriguez",
    faculty: "Engineering",
    batch: 2021,
    interest: "Mechanical Engineering",
    bio: "An engineering student with an interest in mechanical engineering.",
    phonenumber: "+977-983-333-4444",
    email: "crodriguez@email.com",
    githubLink: "crodriguez",
    faceboook: "crodriguez",
    instagram: "crodriguez",
    twitter: "crodriguez",
    username: "crodriguez",
    password: "crodriguez",
  },
  {
    name: "Diana Perez",
    faculty: "Computer Science",
    batch: 2022,
    interest: "Computer Vision",
    bio: "A computer science student with a focus on computer vision.",
    phonenumber: "+977-981-444-5555",
    email: "dperez@email.com",
    githubLink: "dperez",
    faceboook: "dperez",
    instagram: "dperez",
    twitter: "dperez",
    username: "dperez",
    password: "dperez",
  },
  {
    name: "Enrique Gomez",
    faculty: "Business",
    batch: 2022,
    interest: "International Business",
    bio: "A business student with an interest in international business.",
    phonenumber: "+977-982-555-6666",
    email: "egomez@email.com",
    githubLink: "egomez",
    faceboook: "egomez",
    instagram: "egomez",
    twitter: "egomez",
    username: "egomez",
    password: "egomez",
  },
  {
    name: "Felipe Hernandez",
    faculty: "Engineering",
    batch: 2021,
    interest: "Aerospace Engineering",
    bio: "An engineering student with a focus on aerospace engineering.",
    phonenumber: "+977-983-666-7777",
    email: "fhernandez@email.com",
    githubLink: "fhernandez",
    faceboook: "fhernandez",
    instagram: "fhernandez",
    twitter: "fhernandez",
    username: "fhernandez",
    password: "fhernandez",
  },
  {
    name: "Gabriel Martinez",
    faculty: "Computer Science",
    batch: 2022,
    interest: "Data Science",
    bio: "A computer science student with an interest in data science.",
    phonenumber: "+977-981-777-8888",
    email: "gmartinez@email.com",
    githubLink: "gmartinez",
    faceboook: "gmartinez",
    instagram: "gmartinez",
    twitter: "gmartinez",
    username: "gmartinez",
    password: "gmartinez",
  },
  {
    name: "Hector Garcia",
    faculty: "Business",
    batch: 2022,
    interest: "Operations Management",
    bio: "A business student with a focus on operations management.",
    phonenumber: "+977-982-888-9999",
    email: "hgarcia@email.com",
    githubLink: "hgarcia",
    faceboook: "hgarcia",
    instagram: "hgarcia",
    twitter: "hgarcia",
    username: "hgarcia",
    password: "hgarcia",
  },
  {
    name: "Ismael Martinez",
    faculty: "Engineering",
    batch: 2021,
    interest: "Nuclear Engineering",
    bio: "An engineering student with an interest in nuclear engineering.",
    phonenumber: "+977-983-999-0000",
    email: "imartinez@email.com",
    githubLink: "imartinez",
    faceboook: "imartinez",
    instagram: "imartinez",
    twitter: "imartinez",
    username: "imartinez",
    password: "imartinez",
  },
];

/*Notice Details*/
const notices = [
  {
    heading: "Meeting with CEO",
    description:
      "This is a description of a meeting with the CEO to discuss company strategy.",
  },
  {
    heading: "Staff Training",
    description:
      "Description of staff training sessions to improve customer service skills.",
  },
  {
    heading: "Product Launch",
    description: "Description of the launch of a new product.",
  },
  {
    heading: "Sales Meeting",
    description:
      "Description of a meeting to discuss sales goals and strategies.",
  },
  {
    heading: "Marketing Campaign",
    description:
      "Description of a marketing campaign to promote a new product.",
  },
  {
    heading: "Annual Budget Meeting",
    description:
      "Description of the annual budget meeting to discuss financial plans.",
  },
  {
    heading: "Customer Service Meeting",
    description: "Description of a meeting to discuss customer service issues.",
  },
  {
    heading: "Board of Directors Meeting",
    description:
      "Description of a meeting with the board of directors to discuss company plans",
  },
  {
    heading: "IT Maintenance",
    description:
      "Description of IT maintenance to improve network performance.",
  },
  {
    heading: "HR Meeting",
    description: "Description of a meeting to discuss human resources issues.",
  },
  {
    heading: "New Hire Orientation",
    description:
      "Description of a new hire orientation to welcome new employees.",
  },
  {
    heading: "Team Building Event",
    description: "Description of a team building event to improve teamwork.",
  },
  {
    heading: "Research and Development Meeting",
    description:
      "Description of a meeting to discuss new ideas and research projects.",
  },
  {
    heading: "Performance Review",
    description:
      "Description of a performance review to assess employee performance.",
  },
  {
    heading: "Inventory Audit",
    description: "Description of an inventory audit to check stock levels.",
  },
  {
    heading: "Legal Meeting",
    description:
      "Description of a meeting with legal team to discuss pending lawsuits.",
  },
  {
    heading: "Supplier Meeting",
    description:
      "Description of a meeting with suppliers to discuss product delivery.",
  },
  {
    heading: "Marketing Meeting",
    description: "Description of a marketing meeting to discuss",
  },
];

/*Project Details*/
const projects = [
  {
    name: "VSUS",
    description: "Feel the VSUS, Fall for VSUS",
    link: "https://github.com/Rajendrakhanal/vsus",
    categories: ["Other"],
    teammember: [
      { name: "Rajendra Khanal", link: "https://github.com/Rajendrakhanal" },
      { name: "Susheel Thapa", link: "https://github.com/Rajendrakhanal" },
      { name: "Ujjwal Jha", link: "https://github.com/Ujj1225" },
      {
        name: "Saurav Kumar Mahato",
        link: "https://github.com/SauravKumarMahato",
      },
    ],
  },
  {
    name: "A Phone Call",
    description: "Simulation of Call App",
    link: "https://github.com/SusheelThapa/A-Phone-Call",
    categories: ["Other"],
    teammember: [
      { name: "Susheel Thapa", link: "https://github.com/Rajendrakhanal" },
      {
        name: "Saurav Kumar Mahato",
        link: "https://github.com/SauravKumarMahato",
      },
    ],
  },
  {
    name: "Fractal Generator",
    description: "Fractal Generator",
    link: "https://github.com/SuprimDevkota/SDL-Projects/tree/main/FractalGenerator",
    categories: ["Other"],
    teammember: [
      { name: "Suprim Devkota", link: "https://github.com/SuprimDevkota" },
    ],
  },
  {
    name: "Call Break",
    description: "Call Break",
    link: "https://github.com/SwikarGautam/Call-Break",
    categories: ["Other", "Card Game"],
    teammember: [
      { name: "Sujan Koirala", link: "https://github.com/Sujan-Koirala021" },
      { name: "Swikar Gautamn", link: "https://github.com/SwikarGautam" },
    ],
  },
  {
    name: "GH-REST",
    description: "Show github data in website using github rest api",
    link: "https://github.com/parikshitadhikari/gh-rest",
    categories: ["Other"],
    teammember: [
      {
        name: "Parikshit Adhikari",
        link: "https://github.com/parikshitadhikari",
      },
    ],
  },
  {
    name: "Chrome Extension",
    description: "An extension for chrome browser",
    link: "https://github.com/Ujj1225/Chrome-Extension",
    categories: ["Other"],
    teammember: [{ name: "Ujjwal Jha", link: "https://github.com/Ujj1225" }],
  },

  {
    name: "Smart City App",
    description:
      "A mobile app that connects citizens with city services and information",
    link: "https://smartcityapp.com",
    categories: ["AI"],
    teammember: [
      {
        name: "John Smith",
        link: "https://github.com/johnsmith",
      },
      {
        name: "Jane Doe",
        link: "https://github.com/janedoe",
      },
    ],
  },
  {
    name: "Eco-Friendly Cars",
    description:
      "A website that provides information and resources for purchasing electric cars",
    link: "https://ecofriendlycars.com",
    categories: ["AI"],
    teammember: [
      {
        name: "Michael Johnson",
        link: "https://github.com/michaeljohnson",
      },
      {
        name: "Emily Davis",
        link: "https://github.com/emilydavis",
      },
    ],
  },
  {
    name: "Online MarketPlace",
    description: "An e-commerce platform connecting buyers and sellers",
    link: "https://onlinemarketplace.com",
    categories: ["AI"],
    teammember: [
      {
        name: "Emily Davis",
        link: "https://github.com/emilydavis",
      },
      {
        name: "Robert Miller",
        link: "https://github.com/robertmiller",
      },
    ],
  },
  {
    name: "Virtual Fitness",
    description: "A virtual reality fitness app",
    link: "https://virtualfitness.com",
    categories: ["AI"],
    teammember: [
      {
        name: "Robert Miller",
        link: "https://github.com/robertmiller",
      },
      {
        name: "Karen Garcia",
        link: "https://github.com/karengarcia",
      },
      {
        name: "Nancy Rodriguez",
        link: "https://github.com/nancyrodriguez",
      },
    ],
  },
  {
    name: "Green Energy",
    description: "An online platform for purchasing green energy products",
    link: "https://greenenergy.com",
    categories: ["AI"],
    teammember: [
      {
        name: "Joseph Martinez",
        link: "https://github.com/josephmartinez",
      },
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
      {
        name: "David Garcia",
        link: "https://github.com/davidgarcia",
      },
    ],
  },
  {
    name: "Education Hub",
    description: "A platform for online education and professional development",
    link: "https://educationhub.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Mark Davis",
        link: "https://github.com/markdavis",
      },
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
    ],
  },
  {
    name: "Social Media Platform",
    description:
      "A platform for connecting and sharing with friends and family",
    link: "https://socialmediaplatform.com",
    categories: ["DS"],
    teammember: [
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
    ],
  },
  {
    name: "Weather App",
    description: "A mobile app that provides weather forecasts and alerts",
    link: "https://weatherapp.com",
    categories: ["DS"],
    teammember: [
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
      {
        name: "Joshua Hernandez",
        link: "https://github.com/joshuahernandez",
      },
    ],
  },
  {
    name: "Job Search Engine",
    description: "A website for searching and applying for jobs",
    link: "https://jobsearchengine.com",
    categories: ["DS"],
    teammember: [
      {
        name: "Andrew Thompson",
        link: "https://github.com/andrewthompson",
      },
      {
        name: "Brian Torres",
        link: "https://github.com/briantorres",
      },
      {
        name: "Kevin Gomez",
        link: "https://github.com/kevingomez",
      },
      {
        name: "Suarez Tamang",
        link: "https://github.com/suareztamang",
      },
    ],
  },
  {
    name: "Virtual Tour Guide",
    description:
      "A virtual reality app that provides tours of historical and tourist locations",
    link: "https://virtualtourguide.com",
    categories: ["DS"],
    teammember: [
      {
        name: "Michael Johnson",
        link: "https://github.com/michaeljohnson",
      },
      {
        name: "Emily Davis",
        link: "https://github.com/emilydavis",
      },
      {
        name: "Robert Miller",
        link: "https://github.com/robertmiller",
      },
    ],
  },

  {
    name: "Car Sharing Service",
    description: "A platform for sharing and renting cars",
    link: "https://carsharing.com",
    categories: ["DS"],
    teammember: [
      {
        name: "Mark Davis",
        link: "https://github.com/markdavis",
      },
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
    ],
  },

  {
    name: "Pet Adoption Platform",
    description: "A platform for adopting and fostering pets",
    link: "https://petadoption.com",
    categories: ["DS"],
    teammember: [
      {
        name: "Michael Johnson",
        link: "https://github.com/michaeljohnson",
      },
      {
        name: "Emily Davis",
        link: "https://github.com/emilydavis",
      },
    ],
  },
  {
    name: "Online Auction Platform",
    description: "A platform for buying and selling items through auctions",
    link: "https://onlineauction.com",
    categories: ["WebDev"],
    teammember: [
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
    ],
  },
  {
    name: "Online Recipe Platform",
    description: "A platform for sharing and discovering recipes",
    link: "https://onlinerecipe.com",
    categories: ["WebDev"],
    teammember: [
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
      {
        name: "David Garcia",
        link: "https://github.com/davidgarcia",
      },
    ],
  },
  {
    name: "Online Job Board",
    description: "A platform for posting and finding job opportunities",
    link: "https://onlinejobboard.com",
    categories: ["WebDev"],
    teammember: [
      {
        name: "Michael Johnson",
        link: "https://github.com/michaeljohnson",
      },
      {
        name: "Emily Davis",
        link: "https://github.com/emilydavis",
      },
    ],
  },
  {
    name: "Online Legal Platform",
    description: "A platform for connecting with legal services and resources",
    link: "https://onlinelegal.com",
    categories: ["WebDev"],
    teammember: [
      {
        name: "Joseph Martinez",
        link: "https://github.com/josephmartinez",
      },
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
    ],
  },
  {
    name: "Online Investment Platform",
    description:
      "A platform for managing and investing in stocks, bonds and other assets",
    link: "https://onlineinvestment.com",
    categories: ["WebDev"],
    teammember: [
      {
        name: "Michael Johnson",
        link: "https://github.com/michaeljohnson",
      },
      {
        name: "Emily Davis",
        link: "https://github.com/emilydavis",
      },
    ],
  },
  {
    name: "Online Translation Platform",
    description: "A platform for translating text and speech",
    link: "https://onlinetranslation.com",
    categories: ["WebDev"],
    teammember: [
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
    ],
  },
  {
    name: "Online Mental Health Platform",
    description:
      "A platform for connecting with mental health resources and professionals",
    link: "https://onlinementalhealth.com",
    categories: ["AppDev"],
    teammember: [
      {
        name: "Joseph Martinez",
        link: "https://github.com/josephmartinez",
      },
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
    ],
  },
  {
    name: "Online Therapy Platform",
    description: "A platform for connecting with online therapy services",
    link: "https://onlinetherapy.com",
    categories: ["AppDev"],
    teammember: [
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
      {
        name: "David Garcia",
        link: "https://github.com/davidgarcia",
      },
    ],
  },
  {
    name: "Online Personal Finance Platform",
    description: "A platform for managing personal finances and budgeting",
    link: "https://onlinepersonalfinance.com",
    categories: ["AppDev"],
    teammember: [
      {
        name: "Joseph Martinez",
        link: "https://github.com/josephmartinez",
      },
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
    ],
  },
  {
    name: "Online Insurance Platform",
    description: "A platform for buying and managing insurance policies",
    link: "https://onlineinsurance.com",
    categories: ["AppDev"],
    teammember: [
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
    ],
  },
  {
    name: "Online Tax Preparation Platform",
    description: "A platform for preparing and filing taxes online",
    link: "https://onlinetaxpreparation.com",
    categories: ["AppDev"],
    teammember: [
      {
        name: "Joseph Martinez",
        link: "https://github.com/josephmartinez",
      },
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
    ],
  },
  {
    name: "Online Marketplace",
    description:
      "An e-commerce platform for buying and selling a variety of goods",
    link: "https://onlinemarketplace.com",
    categories: ["AppDev"],
    teammember: [
      {
        name: "Joseph Martinez",
        link: "https://github.com/josephmartinez",
      },
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
    ],
  },
  {
    name: "Online Fitness Platform",
    description:
      "A platform for fitness tracking, workout plans and virtual classes",
    link: "https://onlinefitness.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
      {
        name: "David Garcia",
        link: "https://github.com/davidgarcia",
      },
    ],
  },
  {
    name: "Online Music Platform",
    description: "A platform for streaming and listening to music",
    link: "https://onlinemusic.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Joseph Martinez",
        link: "https://github.com/josephmartinez",
      },
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
    ],
  },
  {
    name: "Online Movie and TV Platform",
    description: "A platform for streaming movies and TV shows",
    link: "https://onlinemovies.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Joseph Martinez",
        link: "https://github.com/josephmartinez",
      },
      {
        name: "Michael Brown",
        link: "https://github.com/michaelbrown",
      },
    ],
  },
  {
    name: "Online News Platform",
    description: "A platform for reading and sharing news articles",
    link: "https://onlinenews.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
    ],
  },
  {
    name: "Online Social Network",
    description:
      "A platform for connecting and sharing with friends and family",
    link: "https://onlinesocialnetwork.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
    ],
  },

  {
    name: "Online Laundry Service Platform",
    description:
      "A platform for booking and scheduling laundry pickup and delivery",
    link: "https://onlinelaundryservice.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
    ],
  },
  {
    name: "Online Dry Cleaning Platform",
    description:
      "A platform for booking and scheduling dry cleaning pickup and delivery",
    link: "https://onlinedrycleaning.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
    ],
  },
  {
    name: "Online Real Estate Platform",
    description: "A platform for buying, selling and renting properties",
    link: "https://onlinerealestate.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
    ],
  },
  {
    name: "Online Pet Store",
    description:
      "A platform for buying and selling pet-related products and services",
    link: "https://onlinepetstore.com",
    categories: ["Other"],
    teammember: [
      {
        name: "Jennifer Perez",
        link: "https://github.com/jenniferperez",
      },
      {
        name: "Richard Rodriguez",
        link: "https://github.com/richardrodriguez",
      },
      {
        name: "Charles Martinez",
        link: "https://github.com/charlesmartinez",
      },
      {
        name: "Matthew Robinson",
        link: "https://github.com/matthewrobinson",
      },
    ],
  },
];
/*Assets Details*/
const assets = [
  {
    name: "Computer lab",
    description: "Room equipped with computers",
  },
  {
    name: "Library",
    description: "Building with books and study spaces",
  },
  {
    name: "Science lab",
    description: "Room equipped with scientific equipment",
  },
  {
    name: "Classroom",
    description: "Room for lectures and learning",
  },
  {
    name: "Cafeteria",
    description: "Building with food options",
  },
  {
    name: "Gym",
    description: "Building with fitness equipment",
  },
  {
    name: "Dormitory",
    description: "Building for student housing",
  },
  {
    name: "Student Union",
    description: "Building for student activities and events",
  },
  {
    name: "Theater",
    description: "Building for performances and shows",
  },
  {
    name: "Parking lot",
    description: "Outdoor area for parking vehicles",
  },
  {
    name: "Track",
    description: "Outdoor area for running and sports",
  },
  {
    name: "Swimming pool",
    description: "Indoor or outdoor pool for swimming",
  },
  {
    name: "Tennis court",
    description: "Outdoor court for playing tennis",
  },
  {
    name: "Athletic field",
    description: "Outdoor field for sports and physical activities",
  },
  {
    name: "Observatory",
    description: "Building for astronomical observation",
  },
  {
    name: "Art gallery",
    description: "Building for art exhibitions and displays",
  },
  {
    name: "Music hall",
    description: "Building for music performances and rehearsals",
  },
  {
    name: "Auditorium",
    description: "Large room for lectures, presentations, and performances",
  },
  {
    name: "Field station",
    description: "Building or location for field research and study",
  },
  {
    name: "Greenhouse",
    description: "Building for plant cultivation and research",
  },
  {
    name: "Research lab",
    description: "Room or building for scientific research and experimentation",
  },
  {
    name: "Workshop",
    description: "Room or building for hands-on learning and projects",
  },
  {
    name: "Studio",
    description: "Room or building for artistic creation and production",
  },
];

const populate = async () => {
  await Assets.deleteMany({});
  await Auth.deleteMany({});
  await Notice.deleteMany({});
  await Project.deleteMany({});
  await Student.deleteMany({});

  for (let notice of notices) {
    const not = new Notice(notice);

    not.save();
  }
  const databaseAsset = [];
  for (let asset of assets) {
    const asst = new Assets(asset);

    asst.save();

    databaseAsset.push({ _id: asst._id });
  }

  const databaseStud = [];
  for (let student of students) {
    const stud = await createStudent(
      student.name,
      student.faculty,
      student.batch,
      student.interest,
      student.bio,
      student.phonenumber,
      student.email,
      student.githubLink,
      student.faceboook,
      student.instagram,
      student.twitter,
      student.username,
      student.password
    );
    databaseStud.push(stud);
  }

  for (let project of projects) {
    const not = new Project(project);

    const studentId = databaseStud[Math.floor((Math.random() * 100) % 20)];
    not["owner"] = databaseStud[Math.floor((Math.random() * 100) % 20)];
    not.save();

    const student = await Student.findOne({ _id: studentId });
    student.projects.push(not._id);
    student.save();
  }
};

populate().then(() => {
  console.log("Done");
});
