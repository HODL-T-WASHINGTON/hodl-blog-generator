const express = require("express");

const {
  showCreateForm,
  showPosts,
  createPostLogic,
  reviewPost,
  getPostById,
  getEditPostForm,
  updatePost,
  deletePost,
} = require("../controllers/postController");

//Router
const postRouter = express.Router();

//! Show the create form
postRouter.get("/create", showCreateForm);
//! To get all posts
postRouter.get("/list", showPosts);
//! Create the post (The main logic)
postRouter.post("/create", createPostLogic);
//! Review a Single Post
//postRouter.get("/review/:id", getPostById);
//!get post by id
postRouter.get("/:id", getPostById);
postRouter.get("/:id/edit", getEditPostForm);
postRouter.put("/:id", updatePost);
//!delete post
postRouter.delete("/:id", deletePost);

module.exports = postRouter;