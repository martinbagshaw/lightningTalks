const db = require('../db_connection');
const bcrypt = require("bcryptjs");

// check password with bcrypt.js - bcrypt compare
// 1. destructure username and password
// 2. get the password
// 3. see if password matches
// 4. handle fail and success

const checkPassword = userDetails => {

    // 1.
    const { userName, password } = userDetails;
  
    return new Promise((resolve, reject) => {
  
      // 2.
      db.query('SELECT password FROM users WHERE username = $1',
      [userName],
      (err, res) => {
        if (err) {
          reject(err);
        }
  
        // 3.
        else {
          // console.log(res.rows[0].password);

          // might want this to be in a promise - this and addUser.js fail on heroku

          bcrypt.compare(password, res.rows[0].password,
            (err, passwordsMatch) => {
              
              // 4.
              if (err) {
                // res.status(500).send({ error: true, message: 'Error logging in' });
                reject(err);
              }
              else if (!passwordsMatch) {
                // res.status(403).send({ error: true, message: 'Username or password doesn\'t exist' });
                reject(err);
              }
              
              // success
              else {
                // console.log(passwordsMatch);
                resolve(passwordsMatch);
              }
  
          });
  
        } // end password match
  
  
      });
    });

}

module.exports = checkPassword;