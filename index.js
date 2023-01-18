//Imports
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const router = require("./routes/routes");
const authRoutes = require("./routes/userAuthRoutes");
const connectDB = require("./db/connect");
const login = require("./routes/login");
require("dotenv").config();
mongoose.set("strictQuery", false);
const User = require("./model/User");
const initializePassport = require("./api-request/passport-config");
//Middlewares
const { checkAuthenticated } = require("./checkAuth/checkauth");

//start
app.use(passport.initialize());

initializePassport(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
app.use(passport.session());

//routes
app.get("/home", checkAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated, send username
    res.send(`Welcome ${req.user.username}`);
  } else {
    // User is not authenticated, send unauthorized status code
    res.sendStatus(401);
  }
});
app.get("/", (req, res) => {
  res.redirect("/login");
});
app.use("/login", login);
app.use("/signup", authRoutes);
app.use("/newsfeed", router);

// Start the server
app.listen(port, () => {
  console.log(`Port is listening to port ${port}`);
});
connectDB(process.env.MONGO_URL);
