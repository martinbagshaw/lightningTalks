// export the database functions
module.exports = {

    // - GET users
    checkUser: require('./checkUser'),
    checkPassword: require('./checkPassword'),
    getUserId: require('./getUserId'),
    // - POST users
    addUser: require('./addUser'),
    
    // - GET talks
    checkTalk: require('./checkTalk'),
    getAllTalks: require('./getAllTalks'),
    upcomingTalks: require('./upcomingTalks'),
    // - POST talks
    addTalkToDatabase: require('./addTalkToDatabase'),

};