var mongoose = require('mongoose');
var userSchema = require('../user/user.schema.server')

var eventSchema = new mongoose.Schema({
  name: String,
  host: {type: mongoose.Schema.ObjectId, ref: "User"},
  date: Date,
  description: String,
  image: String,
  attendees:[String],
  capacity: Number
}, {collection:'Events'});

module.exports = eventSchema;
