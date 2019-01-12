// signup route handler
// - handles signup POST request
// - aggregate functions here, most heavy lifting done by other files
// - not sure where and how to test this. It interacts with database functions twice
const helpers = require("../views/helpers/index");

const { sign, verify } = require('jsonwebtoken');
const secret = process.env.SECRET;

// 1. handle error messages, send back to frontend
// 2. check if user exists
// 3. encrypt and add to database
// 4. set cookie

const signup = (req, res) => {
    
  // 1.
  // - get form data
  const { userName, name, email, password } = req.body;

  // - if name, username, email, or password are not entered
  if (!userName && !name && !email && !password) {
    return res.status(400).send({ error: true, message: 'Please fill in all details' })
  }

  // - get form validation functions
  const { usernameValid, nameValid, emailValid, passwordStrong } = helpers.formValidation;
  // - check that valid data has been entered
  if (!usernameValid(userName) && !nameValid(name) && !emailValid(email) && !passwordStrong(password)){
    return res.status(400).send({ error: true, message: 'Please enter valid data' })
  }

  
  // 2.
  // - check user
  helpers.checkUser(userName)
    .then(data => {
    // user doesn't exist
    // - not exists: encrypt password, create user entry, send jwt, redirect to dashboard happens on frontend
    if (!data.rows[0].exists) {
    
      // 3.
      // - encrypt password, and add to database
      helpers.addUser(req.body)
        
        .then(response => {

          // 4.
          // - set a cookie using:
          //    - name and password object
          //    - secret string (also used for retrieval of user on login) - in config.env
          const userDetails =  { userName, password };
          const jwt = sign(userDetails, secret);
          const cookie = `jwt=${jwt}: HttpOnly; Max-Age=9000`;
          
          // probably don't need a return
          return res
          .cookie('lightningJwt', cookie)
          .status(302)
          .send({ success: true, message: 'What\'s up motherFACer! You\'re in!' }); // pick up message on dashboard

        })
        .catch(err => {
          // console.log("addUser error ", err);
          return res.status(500).send({ error: true, message: 'Internal server error' })
        })
    }
    // user alread exists - 409 conflict status code
    else {
      return res.status(409).send({ error: true, message: 'Username already exists. Please try a different username' })
    }

    })
    // error - redirect to 500 page instead?
    // - sends mesage to signup form
    .catch(err => {
      console.log(err)
      return res.status(500).send({ error: true, message: 'Internal server error' })
    })

}
module.exports = signup;
