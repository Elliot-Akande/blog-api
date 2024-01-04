const Comment = require("../models/comment");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Hande Comment creation on POST.
exports.comment_create = [
  body("author", "Username must be present")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Comment must be present")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("post", "Post ID must be present")
    .trim()
    .isLength({ min: 1 })
    .custom(async (value) => {
      const post = await Post.findById(value);
      if (!post) throw new Error("Invalid Post ID");
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
      return;
    }

    const comment = new Comment({
      author: req.body.author,
      content: req.body.content,
      post: req.body.post,
      timestamp: new Date(),
    });
    comment.save();
    res.send(comment);
  }),
];

// Send list of all published Comments on GET.
exports.comment_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.id })
    .sort({ timestamp: 1 })
    .exec();

  res.send(comments);
});
