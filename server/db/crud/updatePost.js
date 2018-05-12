const mongoose = require('../mongoose.js');
const moment = require('moment');

const {Post} = require('../../models/post.js');

const updatePost = async (name, content) => {

  result = await Post.findOneAndUpdate(
    { name },
    { $set: { content, editedAt: new moment().valueOf() } },
    { new: true }
  );
  if (!result) return false;
  return result;

// Figure out how to make timestamps appear human-readable - to the hour would be good. Write my own logic for this? That would be fun. :)

}
const updateName = async (name, content) => {

  console.log(`Start: name is ${name} and new name is ${content}.`);

  result = await Post.findOneAndUpdate(
    { name },
    { $set: { name: content, editedAt: new moment().valueOf() } },
    { new: true }
  );
  if (!result) return false;
  return result;

}

module.exports = {
  updatePost,
  updateName
};
