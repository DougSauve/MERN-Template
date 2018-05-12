const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  createdAt: {
    type: Number,
    required: true
  },
  editedAt: {
    type: Number
  }
});

module.exports = {
  Post
};
