const Post = require("../models/post");
const Author = require("../models/author");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Hande Post creation on POST.
exports.post_create = [
  body("title", "Title must be present").trim().isLength({ min: 1 }).escape(),
  body("content", "Post Content must be present")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author ID must be present")
    .trim()
    .isLength({ min: 1 })
    .custom(async (value) => {
      const author = await Author.findById(value);
      if (!author) throw new Error("Invalid Author ID");
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
      return;
    }

    const post = new Post({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      timestamp: new Date(),
    });
    post.save();
    res.send(post);
  }),
];

// Send list of all published Posts on GET.
exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().populate("author", "username").exec();

  res.send(allPosts);
});

// Send details of specified Post on GET.
exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (!post) {
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.send(post);
});

// Handle Post update on PUT.
exports.post_update = asyncHandler(async (req, res, next) => {
  res.send({ message: "Not yet implemented" });
});

// Handle Post deletion on DELETE.
exports.post_delete = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (!post) {
    const err = new Error("Invalid Post ID");
    err.status = 404;
    return next(err);
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
