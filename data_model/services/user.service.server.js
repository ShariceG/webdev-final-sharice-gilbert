module.exports = function(app){

  const userModel = require('../model/user/user.model.server');

  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const FacebookStrategy = require('passport-facebook').Strategy;
  const bcrypt = require("bcrypt-nodejs");

  app.post('/api/user', createUser);
  app.get('/api/user', findUser);
  app.get('/api/user/:userId', findUserById);
  app.put('/api/user/:userId', updateUser);
  app.delete('/api/user/:userId', deleteUser);

  var FacebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK

  };

  // var FacebookConfig = {
  //   clientID: process.env.FACEBOOK_CLIENT_ID,
  //   clientSecret: process.env.FACEBOOK_SECRET,
  //   callbackURL: process.env.FACEBOOK_CALLBACK
  //
  // };

  passport.use(new FacebookStrategy(FacebookConfig, facebookStrategy))

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(
        function(user) {
          if(user) {
            return done(null, user);
          } else {
            var names = profile.displayName.split(" ");
            var newFacebookUser = {
              lastName:  names[1],
              firstName: names[0],
              email:     profile.emails ? profile.emails[0].value:"",
              facebook: {id: profile.id, token: token}
            };
            return userModel.createUser(newFacebookUser);
          }
        },
        function(err) {
          if (err) { return done(err); }
        })
      .then(
        function(user){
          return done(null, user);
        },
        function(err){
          if (err) { return done(err); }
        }
      );
  }

  passport.use(new LocalStrategy(localStrategy));

  function localStrategy(username, password, done) {
    console.log("username: " + username);
    console.log("password: " + password);

    userModel
      .findUserByUsername(username)
      .then(
        function(user){
          if(user && bcrypt.compareSync(password, user.password)){
            return done(null, user);
          }
          return done(null, false);
        },
        function(err){
          return done(err);
        }
      );
  }

  passport.serializeUser(serializeUser);
  function serializeUser(user, done){
    done(null, user);
  }

  passport.deserializeUser(deserializeUser);
  function deserializeUser(user, done){
    userModel.findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/#/login' }), function(req, res) {
      // console.log(req);
      var user = req.user;
      res.redirect('/#/user/' + user._id);
    });

  app.post("/api/login", passport.authenticate('local'),
    function login(req,res){
      // console.log(req);
      var user = req.user;
      res.send(user);
    }
  );

  app.get('/api/loggedin', function(req, res) {
    // console.log(req.isAuthenticated());
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  app.get('/api/logout', function(req, res){
    req.logout();
    res.send({ message: 'Successfully logged out' });
  });

  app.post('/api/register', register);
  function register(req, res){
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user)
      .then(
        function (user) {
          if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.send(user);
              }
            });
          }
        }
      );

  }


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
