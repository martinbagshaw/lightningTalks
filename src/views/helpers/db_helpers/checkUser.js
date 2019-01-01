// check if user exists in the database
const db = require('../../../database/db_connection');

const checkUser = username => {
  const query = 'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)';
  return db.query(query, [username]);
};

module.exports = checkUser;

// checkUser(userName).then(data => {
//   // user exists in db
//   if (data.rows[0].exists === true) {
//       console.log('user already exists');
//       // 409 = conflict
//       return res.status(409).send({ error: true, message: 'Username already exists in database' });
//   }
//   // can add new user
//   else {
//       // no status code required
//       return res.send({ success: true, message: 'User successfully created'});
//   }
// })