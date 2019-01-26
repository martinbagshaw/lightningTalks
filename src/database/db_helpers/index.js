// export the database functions
module.exports = {
    // - GET users
    checkUser: require('./checkUser').checkUser,
    checkPassword: require('./checkUser').checkPassword,
    getUserId: require('./getUserId'),
    // - POST users
    addUser: require('./addUser'),
    
    // - GET talks
    checkTalk: require('./checkTalk'),
    getAllTalks: require('./getTalks').getAllTalks,
    upComingTalks: require('./getTalks').upComingTalks,
    // - POST talks
    addTalkToDatabase: require('./addTalkToDatabase'),
};