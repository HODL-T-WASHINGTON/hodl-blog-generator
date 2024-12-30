const mongoose = require("mongoose");

//---Link model

const linkSchema = new mongoose.Schema({
  linkTitle: {
      type: String,
      default: "Link TitleJS"
      //required: true
  },
  linkUrl: {
      type: String,
      default: "Link URL"
      //required: true
      
  },
  commentary: {
      type: String,
      default: "Commentary"
  }
});

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;


//---Post model
const postSchema = new mongoose.Schema({
  title: { type: String, default: "Title" },
  status: { type: String, default: "Status" },
  description: { type: String, default: "Description" },
  author: { type: String, default: "Author" },
  essay: { type: String, default: "Essay" },
  links: [linkSchema],
  personal: { type: String, default: "Personal" },
  socialmedia: { type: String, default: "Social Media" },
  promo: { type: String, default: "Promo" }
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
