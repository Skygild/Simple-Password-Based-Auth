const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: (true, "Must put something"),
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", PostSchema);
