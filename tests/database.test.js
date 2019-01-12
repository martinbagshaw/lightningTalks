// database testing

/*
- (theoretically) drop and build a new database on each database test - uses testBuild function
- separated into functions that are used for GET and POST requests
- POST requests do not return data, so GET request checkUser needs to be used in conjunction
*/

const test = require("tape");
const testBuild = require("../src/database/test_db_build.js");
// get database query functions
const helperIndex = require("../src/views/helpers/index");



// GET

// ______________________
// getAllTalks function (gets past talks too)
// - subject
test("getAllTalks function returns subject", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      helperIndex.getAllTalks((err, res) => {
        if (err) {
          console.log("getTalks error: ", err);
        } else {
          // console.log("result from getTalks: ", res);
          t.deepEqual(
            res[0].subject,
            "SCSS",
            "The first entered talk subject in the test database should be SCSS"
          );
          t.end();
        }
      });
    }
  });
});
// - username
test("getAllTalks function returns username", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      helperIndex.getAllTalks((err, res) => {
        if (err) {
          console.log("getTalks error: ", err);
        } else {
          // console.log("result from getTalks: ", res);
          t.deepEqual(
            res[0].username,
            "mr-bagglesworth",
            "The first entered talk should be from user with username 'mr-bagglesworth'"
          );
          t.end();
        }
      });
    }
  });
});





// ______________________
// upComingTalks function - don't get talks that have passed
// - return rows where the datetime column value is greater than the entered argument
test("upComingTalks function fails: date is past any future talks", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      helperIndex.upComingTalks('2019-10-20 17:30:00', (err, res) => {
        if (err) {
          console.log("getTalks error: ", err);
        } else {
          t.deepEqual(
            res[0],
            undefined,
            "There are no talks returned, as there currently are no talks after the entered date of '2019-02-15'"
          );
          t.end();
        }
      });
    }
  });
});
// passing
test("upComingTalks function passes: first subject is 'Database testing'", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      helperIndex.upComingTalks('2019-01-02 20:00:00', (err, res) => {
        if (err) {
          console.log("getTalks error: ", err);
        } else {
          t.deepEqual(
            res[0].subject,
            "Database testing",
            "The next subject of the next talk (as of 02/01/2019) should be 'Database testing'"
          );
          t.end();
        }
      });
    }
  });
});







// ______________________
// checkUser function
// - have to use .then(), and .catch(), as this is how the function is written

// a) user exists
test("checkUser function: User already exists in the database", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      helperIndex.checkUser('mr-bagglesworth')
        // pass
        .then(res => {
          t.deepEqual(
              res.rows[0].exists,
              true,
              "The user 'mr-bagglesworth' should exist in the database"
          );
          t.end();
        })
        // fail
        .catch(err => console.log('checkUser function error: ', err));
    }
  });
});

// b) user doesn't exist
test("checkUser function: User does not exist in the database", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      helperIndex.checkUser('mr-bojangles')
        // pass
        .then(res => {
          t.deepEqual(
            res.rows[0].exists,
            false,
            "The user 'mr-bojangles' does not exist in the database"
          );
          t.end();
        })
        // fail
        .catch(err => console.log('checkUser function error: ', err));
    }
  });
});





// POST

// ______________________
// addUser function
// - currently fails
// - perhaps because there is no callback
// - OR: perhaps I need to run a GET request after user is posted, to see if user has been added?

test("addUser function works: requires checkUser() to see if it has worked", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {

      // sample object we are testing
      const newUserDetails = {
        userName: 'old-greg',
        name: 'im oooool greeeg',
        email: 'olgreg@hotmail.com',
        password: 'Qwert123@'
      }


      // add user to database function
      helperIndex.addUser(newUserDetails)
        // after function run, check if user added
        // - need to use res, can't chain two .then()'s together in this case
        // - guess I need to wait for the result
        .then(res => {
          helperIndex.checkUser('old-greg')
          .then(res => {
            t.deepEqual(
                res.rows[0].exists,
                true,
                "The user 'old-greg' should exist in the database after addUser is run"
            );
            t.end();
          })
          // checkUser fail
          .catch(err => console.log('checkUser function error: ', err));
        })

        // addUser fail
        .catch(err => console.log('addUser function error: ', err));
    }
  });
});