// add all database functions and all regular functions here:
module.exports = {
    // functions
    uppercase: require('./func_helpers/uppercase'),
    // timeStampFrom: require('./func_helpers/timeStampFrom'),
    // showTag: require('./func_helpers/showTag'),
    dateFromStamp: require('./func_helpers/dateFromStamp'),
    timeFromStamp: require('./func_helpers/timeFromStamp'),
    
    // database
    checkUser: require('./db_helpers/checkUser'),
    getAllTalks: require('./db_helpers/getTalks').getAllTalks
};