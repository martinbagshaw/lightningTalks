// run all tests at the same time
module.exports = {
    controllers: require("./controllers.test"),
    handlebars: require("./handlebars.test"),
    dom: require("./dom.test"),
    routes: require("./routes.test"),
    database: require("./database.test")
};