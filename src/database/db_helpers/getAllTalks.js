const db = require('../db_connection');

// get talks from the database
const getAllTalks = () => {

  return new Promise((resolve, reject) => {
      db.query('SELECT talks.id, subject, username, name, datetime, html, css, js, sql, node FROM talks inner join users on users.id = talks.user_id',
      (err, res) => {
          if (err) {
              reject(err);
          }
          else {
              resolve(res.rows);
          }
      })
  })
};

module.exports = getAllTalks;