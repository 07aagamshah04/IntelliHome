const Files = require("../models/blogs");

// Fetch all posts
const getPosts = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "UnAuthorized" });
  }
  try {
    const posts = await Files.find({ createdBy: req.user.familyId });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, text, file } = req.body;
    const createdBy = req.user.familyId; // Assuming familyId is stored in req.user
    const newPost = new Files({ title, text, file, createdBy });
    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Files.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

async function verifyMemebr(req, res) {
  return res.status(200).json({ msg: "Done" });
}

module.exports = {
  getPosts,
  createPost,
  deletePost,
  verifyMemebr,
};
