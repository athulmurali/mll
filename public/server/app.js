module.exports = function(app) {
    console.log("inside public server app");
    require("./services/invite.server.service.js")(app);
    require("./services/user.service.server")(app);

};