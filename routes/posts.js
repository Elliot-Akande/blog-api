const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

/* CREATE a post. */
router.post("/", postsController.post_create);

/* READ all posts. */
router.get("/", postsController.post_list);

/* READ specified post. */
router.get("/:id", postsController.post_detail);

/* UPDATE specified post. */
router.put("/:id", postsController.post_update);

/* DELETE specified post. */
router.delete("/:id", postsController.post_delete);

module.exports = router;
