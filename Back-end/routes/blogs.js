const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  deletePost,
  verifyMemebr,
} = require("../controllers/blogs");

// Get all posts
router.get("/posts", getPosts);

// Create a new post
router.post("/posts", createPost);

// Delete a post by ID
router.delete("/posts/:id", deletePost);

router.route("/members-token-verify").post(verifyMemebr);

module.exports = router;
