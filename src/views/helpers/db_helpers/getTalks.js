// get talks from the database
const dbConnection = require('../../../database/db_connection');

// use an inner join to get some user details
// - this outputs json object, which includes past talks
const getAllTalks = cb => {
  dbConnection.query('SELECT subject, username, name, datetime, html, css, js, sql, node FROM talks inner join users on users.id = talks.user_id',
  (err, res) => {
    if (err) {
      console.log(' database connection Query error in getTalks helper :', err);
      cb(err);
    }
    else {
      cb(null, res.rows);
    }
  });
};


// upcoming talks (takes timestamp in format '2019-01-02 20:00:00')
// - not a pure function, time changes
// - therefore, tests will fail
const upComingTalks = (timeStamp, cb) => {
  dbConnection.query(`SELECT subject, username, name, datetime, html, css, js, sql, node FROM talks inner join users on users.id = talks.user_id AND talks.datetime > '${timeStamp}'`,
  (err, res) => {
    if (err) {
      console.log(' database connection Query error in getTalks helper :', err);
      cb(err);
    }
    else {
      cb(null, res.rows);
    }
  });
}


// module.exports = getAllTalks;
module.exports = {
  getAllTalks,
  upComingTalks
};