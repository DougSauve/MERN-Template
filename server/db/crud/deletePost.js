const mongoose = require('../mongoose.js');
const {Post} = require('../../models/post.js');

const deletePost = async (name) => {
  const res = await Post.findOneAndRemove({name});
  if (!res) return false;
  return res;
}
const deleteAllPosts = async (password) => {
  if (password = "good riddance") {
    const res = await Post.remove({});
    if (!res) return false;
    return res;
  } else {
    return true;
  }
}

module.exports = {
  deletePost,
  deleteAllPosts
};
