const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const commentsRouter = require("./comments");
const passport = require("passport");

// CREATE a Post (Requires auth).
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.post_create
);

// READ all published Posts.
router.get("/public", postsController.post_list);

// ROUTER for comments from specified Post
router.use("/:id/comments", commentsRouter);

// READ specified Post.
router.get("/:id", postsController.post_detail);

// UPDATE specified Post.
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.post_update
);

// DELETE specified Post.
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.post_delete
);

module.exports = router;
