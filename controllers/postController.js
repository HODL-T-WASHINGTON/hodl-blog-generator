const asyncHandler = require("express-async-handler");
const Post = require("../model/Post");

//Show the create form
const showCreateForm = (req, res) => {
  res.render("createPost");
};

//Show post list
const showPosts = async (req, res) => {
  const posts = await Post.find();
  res.render("list", { posts });
};
//create post logic
const createPostLogic = async (req, res) => {
  const { title, status, description, author, essay, links, personal, socialmedia, promo} = req.body;

  if (links) {
    const linkObjects = Object.values(links).map(link => ({
        linkTitle: link.linkTitle,
        linkUrl: link.linkUrl,
        commentary: link.commentary
    }));

    Post.links = linkObjects;
  }
  

  await Post.create({
    title,
    status,
    description,
    author,
    essay,
    links,
    personal,
    socialmedia,
    promo
  });

  //redirect to the post list
  res.redirect("/list");
};

//review post
// const reviewPost = async (req, res) => {
//   const postId = req.params.id;
//   const post = await Post.findById(postId);
//   res.render("reviewPost", { post });
// };


//get post by id
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  console.log(post);
  res.render("reviewPost", {
    title: "Review Post",
    post
  });
});

//get edit post form
const getEditPostForm = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("editPost", {
    title: "Edit Post",
    post
  });
});

//update post
const updatePost = asyncHandler(async (req, res) => {
  const { title, description, status, essay, links, newLinks, deletedLinks, personal, socialmedia, promo, author } = req.body;
  //find the post
  const post = await Post.findById(req.params.id);

  post.title = title || post.title;
  post.description = description || post.description;
  post.status = status || post.status;
  post.essay = essay || post.essay;

  // Update existing links
  if (links) {
    post.links = post.links.map(existingLink => {
        if (deletedLinks && deletedLinks.includes(existingLink._id.toString())) {
            return null; // Mark link for removal
        }

        const updatedLink = links[existingLink._id];
        if (updatedLink) {
            existingLink.linkTitle = updatedLink.linkTitle;
            existingLink.linkUrl = updatedLink.linkUrl;
            existingLink.commentary = updatedLink.commentary;
        }

        return existingLink;
    }).filter(link => link !== null); // Remove marked links
  }

  // Add new links
  if (newLinks) {
    Object.values(newLinks).forEach(link => {
        post.links.push({
            linkTitle: link.linkTitle,
            linkUrl: link.linkUrl,
            commentary: link.commentary
        });
    });
  }
  
  //post.links = links || post.links;
  post.personal = personal || post.personal;
  post.socialmedia = socialmedia || post.socialmedia;
  post.promo = promo || post.promo;
  post.author = author || post.author;
  


  
  console.log("Here is the UPDATED post:",post);
  await post.save();
  res.redirect(`/${post._id}`);
});

//delete post
const deletePost = asyncHandler(async (req, res) => {
  //find the post
  const post = await Post.findById(req.params.id);
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/list");
});



module.exports = {
  showCreateForm,
  showPosts,
  createPostLogic,
  //reviewPost,
  getPostById,
  getEditPostForm,
  updatePost,
  deletePost
};