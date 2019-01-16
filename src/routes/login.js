// login route handler - backend
// - handles login POST request
const helpers = require("../views/helpers/index");
const { sign, verify } = require('jsonwebtoken');
const secret = process.env.SECRET;

// 1. handle error messages, send back to frontend
// 2. check if username exists
// 3. decrypt password and get user from database
// 4. set cookie

const login = (req, res) => {
    
    // 1.
    // - get form data
    const { userName, password } = req.body;
    // - if name or password are not entered
    if (!userName && !password) {
        return res.status(400).send({ error: true, message: 'Please fill in all details' })
    }
    // - get form validation functions
    const { usernameValid, passwordStrong } = helpers.formValidation;
    // - check that valid data has been entered
    if (!usernameValid(userName) && !passwordStrong(password)){
        return res.status(400).send({ error: true, message: 'Please enter valid data' })
    }


    // 2.
    // - check user exists
    helpers.checkUser(userName)
        .then(data => {
            // user doesn't exist
            if (!data.rows[0].exists) {
                return res.status(404).send({ error: true, message: 'Username not found in database. Please check that it is correct' })
            }
            // user DOES exist
            else {

                // 3.
                // - check if password is correct (uses bcrypt compare)
                const userDetails =  { userName, password };
                helpers.checkPassword(userDetails)


                    // 4.
                    // - set cookie
                    .then(response => {
                        const jwt = sign(userDetails, secret);
                        const cookie = `jwt=${jwt} HttpOnly=false Max-Age=9000`;
                        // console.log(userName, ' \'s cookie is: ', cookie);

                        res
                            .cookie('lightningJwt', cookie)
                            .status(302)
                            .send({ success: true, message: 'What\'s up motherFACer! You\'re in!' }); // pick up message on dashboard

                    })

                    // promise error
                    .catch(err => {
                        // console.log("checkPassword() fail ", result);
                        return res.status(409).send({ error: true, message: 'Password incorrect. Please try again' })
                    });

            }
        })
        // catch error
        .catch(err => {
            console.log('checkUser error: ', err)
            return res.status(500).send({ error: true, message: 'Internal server error' })
        })  
}

module.exports = login;