var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('User', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;

function findUserByFacebookId(facebookId) {
  return userModel.findOne({'facebook.id': facebookId})
}

function createUser(user) {
  return userModel.create(user);
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByUsername(username) {
  return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
  return userModel.findOne({username: username , password: password});
}

function updateUser(userId, user){
  return userModel.findByIdAndUpdate(userId, user, {new: true});
}

function deleteUser(userId){
  return userModel.findByIdAndRemove(userId);
}
