const mongoose = require('../mongoose.js');
const {Post} = require('../../models/post.js');

const readPost = async (name) => {
  const res = await Post.findOne({name});
  if (!res) return false;
  return [res];
}
const readAllPosts = async (name) => {
  const res = await Post.find();
  if (!res || !res[0]) return false;

  if (name === "drafts") return res.filter((post) => post.content.endsWith("draft"));
  return res.filter((post) => !post.content.endsWith("draft"));
}

module.exports = {
  readPost,
  readAllPosts
};
