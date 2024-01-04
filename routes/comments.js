const express = require("express");
const router = express.Router({ mergeParams: true });
const commentsController = require("../controllers/commentsController");

/* CREATE a comment. */
router.post("/", commentsController.comment_create);

/* READ all comments. */
router.get("/", commentsController.comment_list);

module.exports = router;
