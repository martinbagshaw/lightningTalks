// index - routes
const express = require("express");
const router = express.Router();

// get controllers - for data processing
const controllers = require("../controllers/index");

// database helpers
const db_helpers = require("../database/db_helpers/index");


// _____________________________
// get POST handlers - for forms
const signup = require("./signup");
const login = require("./login");
const addTalk = require("./addTalk");

// jwt - verify user (was hoping to anyway)
const { sign, verify, decode } = require('jsonwebtoken');
const secret = process.env.SECRET;


// home route
router.get("/", (req, res) => {
  // render home - with buttons (defined in app.js)
  res.render("home", { loginButtons: status });
});


// view talks route
// - output upcoming talks only
router.get("/view-talks", (req, res) => {
  // convert date to something that can work with database query
  const date = controllers.datetimeToStamp(new Date());
  db_helpers.upcomingTalks(date)
    .then(talkList => {
      const formatTalks = controllers.jsonOutput(talkList);
      res.render("view-talks", { talks: formatTalks, loginButtons: status })
    })
    .catch(talksError => {
      res.render("500", { loginButtons: status });
      return;
    })
});



// search talks tool
// - output all talks, irrespective of date
router.get('/search-talks', (req, res) => {
  db_helpers.getAllTalks()
    .then(talkList => {
      const formatTalks = controllers.jsonOutput(talkList);
      res.json(formatTalks)
    })
    .catch(talksError => {
      res.render("500", { loginButtons: status });
      return;
    })
})




// ___________________________________
// routes that change on login status:

// signup route
// - hide when logged in
router.get("/signup", (req, res) => {
  
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

  // must have a cookie to view the dashboard
  if (req.headers.cookie !== undefined && req.headers.cookie.includes('jwt')) {

    // can't seem to decrypt the cookie here - get jwt is malformed error
    const myJwt = req.headers.cookie.split(' ').find(cookie => cookie.includes('lightningJwt'));
    // const jwt = verify(req.headers.cookie, secret);
    // console.log(myJwt);
    // const payload = myJwt.split('.')[1];
    // console.log(payload);
    // const answer = verify(payload, secret);
    // console.log(answer);



    // render dashboard and button state
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
  res
    .clearCookie('lightningJwt')
    .status(302)
    .send({ success: true, message: 'What\'s up motherFACer! You\'re in!' }); // pick up message on dashboard
});

// - add talk
router.post("/addtalk", (req, res) => {
  addTalk(req, res);
});







// ___________________________________
// error pages
router.use((req, res, next) => {
  res.status(404);

  const status = controllers.loginButtons(req);

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