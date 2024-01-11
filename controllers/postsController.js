const Post = require("../models/post");
const Author = require("../models/author");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Handle Post creation on POST.
exports.post_create = [
  body("title", "Title must be present").trim().isLength({ min: 1 }).escape(),
  body("content", "Post Content must be present")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
      return;
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user,
      timestamp: new Date(),
    });
    post.save();
    res.send(post);
  }),
];

// Send list of all published Posts on GET.
exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({ isPublished: true })
    .populate("author", "username")
    .exec();

  res.send(allPosts);
});

// Send list of all Author's Posts on GET.
exports.author_post_list = asyncHandler(async (req, res, next) => {
  // Check user is specified Author
  if (req.params.id !== req.user) {
    const err = new Error(
      "You are not authorized to access the requested resource."
    );
    err.status = 403;
    return next(err);
  }

  const allPosts = await Post.find({ author: req.params.id })
    .populate("author", "username")
    .exec();

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
exports.post_update = [
  body("title", "Title must be present").trim().isLength({ min: 1 }).escape(),
  body("content", "Post Content must be present")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isPublished", "isPublished must be a boolean value").isBoolean(),

  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).exec();
    if (!post) {
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }

    // Check user is Post Author.
    if (post.author.toString() !== req.user) {
      const err = new Error(
        "You cannot update a Post that you did not create."
      );
      err.status = 403;
      return next(err);
    }

    // Validate body.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
      return;
    }

    // Perform Update.
    post.title = req.body.title;
    post.content = req.body.content;
    post.isPublished = req.body.isPublished;
    post.save();

    res.send(post);
  }),
];

// Handle Post deletion on DELETE.
exports.post_delete = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();
  if (!post) {
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  // Check user is Post Author
  if (post.author.toString() !== req.user) {
    const err = new Error("You cannot delete a Post that you did not create.");
    err.status = 403;
    return next(err);
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
