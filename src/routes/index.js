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
router.get("/view-talks", (req, res) => {
  helpers.getAllTalks((err, talkList) => {
    if (err) {
      res.statusCode = 500;
      res.send("Error");
    }
    res.render("view-talks", { talks: talkList })
  })
});

// search talks tool
router.get('/search-talks', (req, res) => {
  helpers.getAllTalks((err, talkList) => {
    if (err) {
      res.statusCode = 500;
      res.send("Error");
    }
    res.json(talkList)
  })
})



// ___________________________________
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
router.get("/dashboard", (req, res) => {
  res.render("dashboard" ); //, { talks: helpers.getUserTalks } // use jwt to get talks for logged in user
});

// POST request from form
// router.post("/create-profile", (req, res) => {
//   helpers.postDataLanguages(
//     req.body
//   );
//   res.redirect("/search-profiles");
// });






// search profiles route
// router.get("/search-profiles", (req, res) => {
//   getData.getUserData((err, userData) => {
//     if (err) {
//       res.statusCode = 500;
//       res.send("Error");
//     }
//     res.render("search-profiles", { users: userData, languages: langData } )
//   })
// })


// search tool
// router.get('/search-user', (req, res) => {

//   getData.getUserData((err, userData) => {
//     if (err) {
//       res.statusCode = 500;
//       res.send("Error");
//     }
//     res.json(userData)
//   })
// })




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