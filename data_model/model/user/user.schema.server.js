var mongoose = require('mongoose');
var eventSchema = require('../event/event.schema.server');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  facebook: { id: String, token: String },
  email: String,
  organization: String,
  role: { type: String, enum: ['host', 'attendee'] },
  events:[eventSchema]
}, {collection:'Users'});

module.exports = userSchema;
