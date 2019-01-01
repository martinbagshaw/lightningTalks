// add all database functions and all regular functions here:
module.exports = {
    // functions
    upperCase: require("./func_helpers/uppercase"),
    // database
    checkUser: require("./db_helpers/checkUser"),
    getTalks: require('./db_helpers/getTalks')
};