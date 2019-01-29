// - data processing functions (that don't interact directly with the database)
module.exports = {

    // - input to db (impure function):
    datetimeToStamp: require('./datetimeToStamp'),
    // json output - languages as an array
    jsonOutput: require('./jsonOutput'),
    // order by timestamp
    talksByTimestamp: require('./talksByTimestamp'),

    // form validation
    formValidation: require('./formValidation'),
    
    // login status
    // - simple yes/no logged in, needs to be used within a request
    loginButtons: require('./loginButtons'), // might want to delete this

};