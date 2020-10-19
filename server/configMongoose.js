var mongoose = require('mongoose');

const conf = {
  hostname: process.env.MONGO_HOSTNAME || 'localhost',
  port: process.env.MONGO_PORT || '27017',
  env: process.env.MONGOENV || 'local'
};

mongoose.connect(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`);

const articleSchema = {
  articleTile: String,
  articleContent: String
};
const Article = mongoose.model('Article', articleSchema, 'articles');

const userSchema = {
  'username' : {type: String, index: {unique: true, dropDups: true}},
  'password' : String,
  'firstName' : String,
  'lastName' : String,
  'email' : {type:String, index: {unique: true, dropDups: true}},
  'role' : {type: String, default: 'editor'},
  'verified' : Boolean,
  'imageUrl' : String
};
const User = mongoose.model('User', userSchema, 'pubUsers');


module.exports = {
  Article,
  User
};

