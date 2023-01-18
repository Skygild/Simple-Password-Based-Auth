const User = require("../model/User");
const Post = require("../model/Post");

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
  }
};

const newPost = async (req, res) => {
  try {
    const postContent = req.body;
    const post = await Post.create(postContent);
    res.status(201).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const getSpecificPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params });
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userPosts = await Post.find({ author: req.params });
    res.status(200).json({ userPosts });
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.content },
      req.body
    );
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const post = await Post.findOneAndDelete({ _id: postID });
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPost,
  newPost,
  editPost,
  deletePost,
  getSpecificPost,
  getUserPosts,
};
