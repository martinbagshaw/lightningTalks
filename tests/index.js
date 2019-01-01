// run all tests at the same time
module.exports = {
    functions: require("./functions.test"),
    routes: require("./routes.test"),
    database: require("./database.test")
};