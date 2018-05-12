const mongoose = require('../mongoose.js');
const moment = require('moment');

const {Post} = require('../../models/post.js');

const createPost = async (name, content) => {

  const post = new Post({
    name,
    content,
    createdAt: new moment().valueOf()
  });

  return await post.save();
}

module.exports = {
  createPost
};
