var mongoose = require('mongoose');
var eventSchema = require('./event.schema.server');

var eventModel = mongoose.model('Event', eventSchema);


eventModel.createEvent = createEvent;
eventModel.findEventById = findEventById;
eventModel.findEventByName = findEventByName;
eventModel.findEventsByHostId = findEventsByHostId;
eventModel.findEventByDate = findEventByDate;
eventModel.updateEvent = updateEvent;
eventModel.deleteEvent = deleteEvent;

module.exports = eventModel;

function createEvent(event) {
  return eventModel.create(event);
}

function findEventById(eventId) {
  return eventModel.findById(eventId)
}

function createRegex(userInput) {
  return new RegExp(
    // Escape all special characters except *
    userInput.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1")
    // Allow the use of * as a wildcard like % in SQL.
      .replace(/\*/g, ".*"),
    'i'
  );
}

function findEventByName(name) {
  let input = createRegex(name);
  // console.log(name);
  // console.log(input);
  return eventModel.find({name: {$regex: input}});
}

function findEventByDate(date) {
  return eventModel.findOne({date: date});
}

function findEventsByHostId(hostId) {
  return eventModel.find({host: hostId});
}

function updateEvent(eventId, event) {
  return eventModel.findByIdAndUpdate(eventId, event, {new: true});
}

function deleteEvent(eventId) {
  return eventModel.findByIdAndRemove(eventId);
}
