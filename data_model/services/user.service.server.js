module.exports = function(app){

  const userModel = require('../model/user/user.model.server');

  app.post('/api/user', createUser);
  app.get('/api/user', findUser);
  app.get('/api/user/:userId', findUserById);
  app.put('/api/user/:userId', updateUser);
  app.delete('/api/user/:userId', deleteUser);


  function createUser(req, res) {
    var user = req.body;
    userModel
      .createUser(user)
      .then(
        function (user) {
          res.status(200).send(user);
        },
        function (error) {
          console.log("create user error: " + error);
          res.status(400).send(error);
        }
      );
  }

  app.get("/api/user", findUser);
  function findUser(req,res){
    if (req.query["password"]){
      findUserByCredentials(req,res);
    } else {
      findUserByUsername(req, res);
    }
  }

  function findUserByCredentials(req, res) {
    let username = req.query["username"];
    let password = req.query["password"];
    userModel.findUserByCredentials(username, password)
      .then(
        function (user) {
          if (user){
            console.log("user found!");
            res.status(200).send(user);
          } else {
            console.log("no user found");
            res.status(404).send({error_msg: "user not found"});
          }
        },
        function (error) {
          console.log(error);
          res.status(400).send(error);
        }
      );
  }

  function findUserByUsername(req, res) {
    let username = req.query["username"];
    userModel.findUserByUsername(username)
      .then(
        function (user) {
          console.log("user found!");
          res.status(200).send(user);
        },
        function (error) {
          console.log(error);
          res.status(400).send(error);
        }
      );
  }

  function findUserById(req, res) {
    let userId = req.params.userId;
    userModel.findUserById(userId)
      .then(
        function (user) {
          if (user){
            console.log("user found!");
            res.status(200).send(user);
          } else {
            console.log("no user found");
            res.status(404).send({error_msg: "user not found"});
          }
        },
        function (error) {
          //console.log(error);
          res.status(400).send(error);
        }
      );
  }

  function updateUser(req, res) {
    let userId = req.params.userId;
    let body = req.body;

    userModel.updateUser(userId, body)
      .then(
        function(user) {
          if (user){
            console.log("user updated!");
            res.status(200).send(user);
          } else {
            console.log("no user found");
            res.status(404).send({error_msg: "user not found"});
          }
        },
        function(error){
          res.status(400).send(error);
        }
      );
  }

  function deleteUser(req, res) {
    let userId = req.params.userId;
    userModel.deleteUser(userId)
      .then(
        function(user) {
          if (user) {
            res.status(200).send({message: "user deleted"});
          } else {
            res.status(404).send({error_msg: "user not found"});
          }
        },
        function(error) {
          res.status(400).send(error);
        }
      );
  }

};
