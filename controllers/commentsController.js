const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

// Hande Comment creation on POST.
exports.comment_create = asyncHandler(async (req, res, next) => {
  res.send({ message: "Not yet implemented" });
});

// Send list of all published Comments on GET.
exports.comment_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.id })
    .sort({ timestamp: 1 })
    .exec();

  res.send(comments);
});
