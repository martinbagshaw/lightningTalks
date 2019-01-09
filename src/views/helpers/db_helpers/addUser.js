// add user entry to the database
const db = require('../../../database/db_connection');

const addUser = details => {
//   const query = 'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)';
//   return db.query(query, [username]);
};

module.exports = addUser;