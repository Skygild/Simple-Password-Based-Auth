const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { userSignUp, getUser } = require("../api-request/userAuth");

// User Authentication routes
authRoutes
  .route("/")
  .post(userSignUp)
  .get((req, res) => {
    res.send(`<form action="/signup" method="POST">
    <h1>Sign Up</h1>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <br>
    <input type="submit" value="Sign Up">
  </form>
  `);
  });

module.exports = authRoutes;
