const express = require("express");
const router = express.Router();
const {
  getAllPost,
  newPost,
  editPost,
  deletePost,
  getSpecificPost,
  getUserPosts,
} = require("../api-request/request");

// Post routes
router.route("/").get(getAllPost).get(getUserPosts).post(newPost);
router.route("/:id").get(getSpecificPost).patch(editPost).delete(deletePost);

module.exports = router;
