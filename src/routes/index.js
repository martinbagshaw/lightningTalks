// index - routes
// - could split into more files, as with helpers
const express = require("express");
const router = express.Router();

// get helper functions
const helpers = require("../views/helpers/index");

// get POST handlers
const signup = require("./signup");

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
// - can access edit talk route through here (protected)

// add this with a helper - e.g. database query for boolean values
// - used for checkboxes
const languages = ['html', 'css', 'js', 'sql', 'node'];
router.get("/dashboard", (req, res) => {

  // logged in
  // - should I check more than just jwt though?
  // - can jwt be decrypted and matched to a particular user?
  // - undefined = does not interfere with tests:

  if (req.headers.cookie !== undefined && req.headers.cookie.includes('jwt')) {
    res.render("dashboard", { languages: languages} );
  }
  // not logged in
  else {
    // 403 - forbidden. You need to be logged in to do this
    res.status(403);
    res.render("403");
  }
});







// ___________________________________
// POST requests
// - signup
router.post("/signup", (req, res, next) => {
  signup(req, res);
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