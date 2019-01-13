// index - routes
// - could split into more files, as with helpers
const express = require("express");
const router = express.Router();

// get helper functions
const helpers = require("../views/helpers/index");

// get POST handlers - for forms
const signup = require("./signup");
const login = require("./login");

// jwt - verify user (was hoping to anyway)
const { sign, verify, decode } = require('jsonwebtoken');
const secret = process.env.SECRET;


// home route
router.get("/", (req, res) => {
  // buttons
  const status = helpers.loginButtons(req);
  res.render("home", { loginButtons: status });
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
    // buttons
    const status = helpers.loginButtons(req);
    res.render("view-talks", { talks: formatTalks, loginButtons: status })
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
  const status = helpers.loginButtons(req);
  
  // if logged in, go to dashboard
  if (req.headers.cookie !== undefined && req.headers.cookie.includes('jwt')) {
    res.render("dashboard", { languages: languages, loginButtons: status});
  }
  else {
    res.render("signup", {loginButtons: status});
  }
});


// login route
// - hide when logged in
router.get("/login", (req, res) => {
  const status = helpers.loginButtons(req);
  
  // if logged in, go to dashboard
  if (req.headers.cookie !== undefined && req.headers.cookie.includes('jwt')) {
    res.render("dashboard", { languages: languages, loginButtons: status});
  }
  else {
    res.render("login", {loginButtons: status});
  }
});




// dashboard route
// - can access edit talk route through here (protected)

// add this with a helper - e.g. database query for boolean values
// - used for checkboxes
const languages = ['html', 'css', 'js', 'sql', 'node'];
router.get("/dashboard", (req, res) => {

  // simple yes/no for buttons if logged in
  const status = helpers.loginButtons(req);
  
  
  // logged in
  // - should I check more than just jwt though?
  // - can jwt be decrypted and matched to a particular user? I don't think so
  // - undefined = does not interfere with tests:

  if (req.headers.cookie !== undefined && req.headers.cookie.includes('jwt')) {

    const myJwt = req.headers.cookie.split(' ').find(cookie => cookie.includes('jwt'));
    // console.log(myJwt);

    // can't seem to verify or decode

    
    const decoded = decode(myJwt, secret);
    // console.log(decoded, secret);

    // const a = JSON.parse(myJwt);
    // console.log(a);

    // console.log(req.headers);

    // const a = 'jwt%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRhdmUiLCJwYXNzd29yZCI6InF3ZTEyM0FAUyIsImlhdCI6MTU0NzMyNzkyMn0.Vtvp4n9O5womcdaalgMe0oeu6W4_qDXzQl1r4bb6syY%3A%20';
    // const decoded = verify(myJwt, secret);
    // console.log(decoded)


    
    
    
    // how to get user details, and add them to the page?
    // - user's talks
    // - username and profile details (for adding a talk)
    res.render("dashboard", { languages: languages, loginButtons: status} );
  }
  // not logged in
  else {
    // 403 - forbidden. You need to be logged in to do this
    res
      .status(403)
      .render("403", { loginButtons: status });
  }
});







// ___________________________________
// POST requests
// - signup
router.post("/signup", (req, res, next) => {
  signup(req, res);
});

// - login
router.post("/login", (req, res) => {
  login(req, res);
});

// - logout
router.post("/logout", (req, res) => {

  const status = helpers.loginButtons(req);
  res
    .clearCookie('lightningJwt')
    .status(302)
    .send({ success: true, message: 'What\'s up motherFACer! You\'re in!' }); // pick up message on dashboard
});







// ___________________________________
// error pages
router.use(function(req, res, next) {
  res.status(404);

  const status = helpers.loginButtons(req);

  if (req.accepts('html')) {
    res.render("404", { loginButtons: status });
    return;
  }

  if (req.accepts('json')) {
    res.render("500", { loginButtons: status });
    return;
  }

  res.type('txt').send('Not found');
});

module.exports = router;