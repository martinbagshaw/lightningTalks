// check if user exists in the database
const db = require('../../../database/db_connection');
const bcrypt = require("bcryptjs");

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








// - check password, uses bcrypt.js
const checkPassword = userDetails => {

  // get (user entered) username and password
  const { userName, password } = userDetails;


  return new Promise((resolve, reject) => {

    // 1. get the password
    db.query(`SELECT password FROM users WHERE username = '${userName}'`, (err, res) => {
      if (err) {
        reject('no password found in database ', err);
      }

      // 2. see if password matches
      else {
        // - compare user entered password to one found in the database
        bcrypt.compare(password, res.rows[0].password,
          (err, passwordsMatch) => {
            // console.log(res.rows[0].password);
            // console.log(err, passwordsMatch);
            
            // fail
            if (err) {
              // res.status(500).send({ error: true, message: 'Error logging in' });
              reject('server error ', err);
            }
            if (!passwordsMatch) {
              // res.status(403).send({ error: true, message: 'Username or password doesn\'t exist' });
              reject('password doesn\'t match one found in the database ', err);
            }
            
            // success
            // - should return true if passwords match
            else {
              // console.log('logged in');
              resolve(passwordsMatch);
            }

        });

      } // end password match


    });
  });



}

module.exports = {
  checkUser,
  checkPassword
};