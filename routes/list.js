const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send([
    {
      routes: "/api/users",
      method: "GET",
      description: "Get the list of all the users",
    },
    {
      routes: "/api/users/id",
      method: "GET",
      description: "Get the user with provided id",
    },
    {
      routes: "/api/users/bookassets",
      method: "POST",
      description: "Book the assets for a particular user",
    },

    {
      routes: "/api/assets",
      method: "GET",
      description: "Get the list of all the assets",
    },
    {
      routes: "/api/assets/id",
      method: "GET",
      description: "Get the asset of provided id",
    },

    {
      routes: "/api/login",
      method: "POST",
      description: "Send the login credentials",
    },

    {
      routes: "/api/signup",
      method: "POST",
      description: "Send the credentail to create a new user",
    },

    {
      routes: "/api/colleges",
      method: "GET",
      description: "Get the list of all the colleges",
    },
    {
      routes: "/id",
      method: "GET",
      description: "Get the college of provided id",
    },

    {
      routes: "/api/tags",
      method: "GET",
      description: "Get the list of all the tags",
    },

    {
      routes: "/api/token/create",
      method: "POST",
      description: "Create a token for given credentials",
    },
    {
      routes: "/api/token/data",
      method: "POST",
      description: "Retrieve the data from the token",
    },
  ]);
});

module.exports = router;
