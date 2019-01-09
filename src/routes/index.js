// index - routes
// - could split into more files, as with helpers
const express = require("express");
const router = express.Router();

// get helper functions
const helpers = require("../views/helpers/index");

// home route
router.get("/", (req, res) => {
  res.render("home");
});



// view talks route
// - output upcoming talks only
router.get("/view-talks", (req, res) => {
  // convert date to something that can work with database query
  const date = helpers.datetimeToStamp(new Date());
  helpers.upComingTalks(date, (err, upcomingTalkList) => {
    if (err) {
      res.statusCode = 500;
      res.send("Error");
    }
    // json processing here
    const formatTalks = helpers.jsonOutput(upcomingTalkList);
    res.render("view-talks", { talks: formatTalks })
  })
});


// search talks tool
// - output all talks, irrespective of date
router.get('/search-talks', (req, res) => {
  helpers.getAllTalks((err, talkList) => {
    if (err) {
      res.statusCode = 500;
      res.send("Error");
    }
    // json processing here
    const formatTalks = helpers.jsonOutput(talkList);
    res.json(formatTalks)
  })
})




// ___________________________________
// routes that change on login status:

// signup route
// - hide when logged in
router.get("/signup", (req, res) => {
  res.render("signup" );
});


// login route
// - hide when logged in
router.get("/login", (req, res) => {
  res.render("login" );
});


// dashboard route
// - protected
// - can post talk through here
// - can access edit talk route through here (protected)

// add this with a helper - e.g. database query for boolean values
// - used for checkboxes?
const languages = ['html', 'css', 'js', 'sql', 'node'];
router.get("/dashboard", (req, res) => {
  res.render("dashboard", { languages: languages} ); //, { talks: helpers.getUserTalks } // use jwt to get talks for logged in user
});





// ___________________________________
// POST requests


// signup
// - break this up into another file:
router.post("/signup", (req, res, next) => {

  // get form data
  const { userName, name, email, password } = req.body;

  // if name, username, email, or password are not entered
  if (!userName && !name && !email && !password) {
    return res.status(400).send({ error: true, message: 'Please fill in all details' })
  }

  // get form validation functions
  const { usernameValid, nameValid, emailValid, passwordStrong } = helpers.formValidation;
  // check that valid data has been entered
  if (!usernameValid(userName) && !nameValid(name) && !emailValid(email) && !passwordStrong(password)){
    return res.status(400).send({ error: true, message: 'Please enter valid data' })
  }


  // check user
  helpers.checkUser(userName).then(data => {
    // user doesn't exist
    // - not exists: encrypt password, create user entry, send jwt, redirect to dashboard happens on frontend
    if (!data.rows[0].exists) {
      
      // encrypt password
      // add details to database
      // send jwt
      console.log(userName, name, email, password);

      // response
      return res.send({ success: true, message: 'User successfully created'})
    }
    // user exists - 409 conflict status code
    else {
      return res.status(409).send({ error: true, message: 'Username already exists. Please try a different username' })
    }
    
  })
  // error - redirect to 500 page instead?
  .catch(err => {
    console.log(err)
    return res.status(500).send({ error: true, message: 'Internal server error' })
  })

});








// ___________________________________
// error pages
router.use(function(req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render("404");
    return;
  }

  if (req.accepts('json')) {
    res.render("500");
    return;
  }

  res.type('txt').send('Not found');
});

module.exports = router;