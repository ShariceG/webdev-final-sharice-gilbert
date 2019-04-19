module.exports=function(app) {

  require("./services/user.service.server")(app)
  require("./services/event.service.server")(app)

};
