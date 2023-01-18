const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const login = express.Router();
const { checkNotAuthenticated } = require("../checkAuth/checkauth");

// User Authentication routes
login
  .route("/")
  .get((req, res) => {
    res.send(
      `<form action="/login" method="POST">
      <label>Username : </label><input type="username" placeholder="Enter Username" name="username" id="username" required>
      <label>Password : </label> <input type="password" placeholder="Enter Password" name="password" id="password" required> 
      <button type="submit">Login</button>
      </form>`
    );
  })
  .post(
    checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/login",
    })
  );

module.exports = login;
