const Post = require("../models/post");
const Author = require("../models/author");
const asyncHandler = require("express-async-handler");

// Hande Post creation on POST.
exports.post_create = asyncHandler(async (req, res, next) => {
  res.send({ message: "Not yet implemented" });
});

// Send list of all published Posts on GET.
exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({ isPublished: true })
    .populate("author", "username")
    .exec();

  res.send(allPosts);
});

// Send details of specified Post on GET.
exports.post_detail = asyncHandler(async (req, res, next) => {
  res.send({ message: "Not yet implemented" });
});

// Handle Post update on PUT.
exports.post_update = asyncHandler(async (req, res, next) => {
  res.send({ message: "Not yet implemented" });
});

// Handle Post deletion on DELETE.
exports.post_delete = asyncHandler(async (req, res, next) => {
  res.send({ message: "Not yet implemented" });
});
