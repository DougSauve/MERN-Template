const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/DatabaseName');

module.exports = { mongoose };
