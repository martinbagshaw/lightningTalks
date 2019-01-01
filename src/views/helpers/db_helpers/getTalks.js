// get all talks from the database
const dbConnection = require('../../../database/db_connection');

const getTalks = cb => {
  dbConnection.query('SELECT * FROM talks', (err, res) => {
    if (err) {
      console.log(' database connection Query error in getTalks helper :', err);
      return cb(err);
    } else {
      return cb(null, res.rows);
    }
  });
};

module.exports = getTalks;