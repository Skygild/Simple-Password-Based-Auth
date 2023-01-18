const User = require("../model/User");
const bcrypt = require("bcrypt");

const userSignUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // save the new user to the DB
    const newUser = {
      username,
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    res.status(200).redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const getAllUser = await User.find();
    res.status(200).json(getAllUser);
  } catch (err) {
    console.log(err);
  }
};

const userLoggedIn = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

module.exports = { userSignUp, userLoggedIn, getUser };
