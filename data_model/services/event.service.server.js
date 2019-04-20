module.exports=function(app) {

  const eventModel = require('../model/event/event.model.server');
  const moment = require('moment');

  app.get('/api/event/:eventId', findEventById);
  app.get('/api/event/host/:hostId', findEventsByHostId);
  app.get('/api/event', findEvent);
  app.post('/api/user/:userId/event', createEvent);
  app.put('/api/event/:eventId', updateEvent);
  app.delete('/api/event/:eventId', deleteEvent);

  function findEventById(req, res) {
    let eventId = req.params.eventId;
    eventModel.findEventById(eventId)
      .then(
        function (event) {
          if (event){
            res.status(200).send(event);
          } else {
            console.log("no event found");
            res.status(404).send({error_msg: "event not found"});
          }
        },
        function (error) {
          res.status(400).send(error);
        }
      );
  }

  function findEvent(req, res) {
    let event = {};
    if (req.query['name']){
      findEventByName(req, res);
    } else {
      findEventByDate(req, res);
    }
  }

  function findEventByName(req, res) {
    let name = req.query['name']
    // console.log(name);
    eventModel.findEventByName(name)
      .then(
        function(event){
          console.log(event);
          res.status(200).send(event)
        },
        function(error){
          res.status(400).send(error)
        }
      );
  }

  function findEventsByHostId(req, res) {
    let hostId = req.params.hostId;
    eventModel.findEventsByHostId(hostId)
      .then(
        function(events){
          if (events) {
            res.status(200).send(events)
          } else {
            res.status(404).send({message: "no events found"})
          }
        },
        function(error){
          res.status(400).send(error);
        }
      );
  }

  function findEventByDate(req, res) {
    res.status(200).send({message: "not implemented"})

  }

  function createEvent(req, res){
    let userId = req.params.userId;
    event = req.body;
    event.host = userId;
    eventModel.createEvent(event)
      .then(
        function(event){
          res.status(200).send(event);
        },
        function(error){
          res.status(400).send(error);
        }
      );
  }


  function updateEvent( req, res) {
    eventId = req.params.eventId;
    event = req.body;
    eventModel.updateEvent(eventId, event)
      .then(
        function(event) {
          if (event) {
            res.status(200).send(event);
          } else {
            res.status(404).send({error_msg: "event not found"})
          }
        },
        function(error) {
          res.status(400).send(error);
        }
      );
  }


  function deleteEvent(req, res) {
     let eventId = req.params.eventId;
     eventModel.deleteEvent(eventId)
       .then(
         function(event){
           if(event) {
             res.status(200).send({message: "event deleted"})
           } else {
             res.status(404).send({error_msg: "event not found"});
           }
         },
         function(error){
           res.status(400).send(error);
         }
       );
  }

  // function joinEvent(req, res) {
  //   let eventId = req.params.eventId;
  //   let body = req.body
  //   eventModel.updateEvent(eventId, body)
  //     .then(
  //       function(event){
  //         if(event) {
  //           res.status(200).send(event);
  //         }
  //       },
  //       function(error) {
  //         res.status(400).send(errror);
  //       }
  //     );
  // }

};
