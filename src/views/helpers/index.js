// add all database functions and all regular functions here:
module.exports = {
    
    // _________
    // functions
    uppercase: require('./func_helpers/uppercase'),
    // - output from db:
    dateFromStamp: require('./func_helpers/dateFromStamp'),
    timeFromStamp: require('./func_helpers/timeFromStamp'),
    // - input to db (impure function):
    datetimeToStamp: require('./func_helpers/datetimeToStamp'),
    // json output - languages as an array
    jsonOutput: require('./func_helpers/jsonOutput'),
    // form validation
    formValidation: require('./func_helpers/formValidation'),
    
    
    // _________
    // database
    checkUser: require('./db_helpers/checkUser').checkUser,
    checkPassword: require('./db_helpers/checkUser').checkPassword,
    getAllTalks: require('./db_helpers/getTalks').getAllTalks,
    upComingTalks: require('./db_helpers/getTalks').upComingTalks,
    addUser: require('./db_helpers/addUser')

};