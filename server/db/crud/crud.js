const {createPost} = require('./createPost');
const {readPost, readAllPosts} = require('./readPost');
const {updatePost, updateName} = require('./updatePost');
const {deletePost, deleteAllPosts} = require('./deletePost');

module.exports = {
  createPost,
  readPost,
  readAllPosts,
  updatePost,
  updateName,
  deletePost,
  deleteAllPosts
};
