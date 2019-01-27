// check if user exists in the database
const db = require('../db_connection');

// - check user
const checkUser = username => {
  const query = 'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)';
  return db.query(query, [username]);
};

// how the function is used:
// checkUser(userName).then(data => {
//   // user exists in db
//   if (data.rows[0].exists === true) {
//       console.log('user already exists');
//       409 = conflict
//   }
//   // can add new user
//   else {
//       // no status code required, send a message to the frontend
//       return res.send({ success: true, message: 'User successfully created'});
//   }
// })

module.exports = checkUser;