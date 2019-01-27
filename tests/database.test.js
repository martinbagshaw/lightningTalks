// database testing

/*
- (theoretically) drop and build a new database on each database test - uses testBuild function
- separated into functions that are used for GET and POST requests
- POST requests do not return data, so GET request checkUser needs to be used in conjunction
*/

const test = require("tape");
const testBuild = require("../src/database/test_db_build.js");
// get database query functions
const db_helpers = require("../src/database/db_helpers/index");



// GET

// ______________________
// getAllTalks function (gets past talks too)
// - subject
test("getAllTalks function returns subject", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      db_helpers.getAllTalks()
        .then(res => {
          t.deepEqual(
            res[0].subject,
            "SCSS",
            "The first entered talk subject in the test database should be SCSS"
          );
          t.end();
        })
        // fail
        .catch(err => console.log('getAllTalks not returning subject: ', err));
    }
  });
});
// - username
test("getAllTalks function returns username", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      db_helpers.getAllTalks()
        .then(res => {
          t.deepEqual(
            res[0].username,
            "mr-bagglesworth",
            "The first entered talk should be from user with username 'mr-bagglesworth'"
          );
          t.end();
        })
        // fail
        .catch(err => console.log('getAllTalks not returning username: ', err));
    }
  });
});





// ______________________
// upcomingTalks function - don't get talks that have passed
// - return rows where the datetime column value is greater than the entered argument
test("upcomingTalks function fails: date is past any future talks", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      db_helpers.upcomingTalks('2029-10-20 17:30:00')
        .then(res => {
          t.deepEqual(
            res[0],
            undefined,
            "There are no talks returned, as there currently are no talks after the entered date of '2019-02-15'"
          );
          t.end();
        })
        // fail
        .catch(err => console.log('upcomingTalks with future date error: ', err));
    }
  });
});
// passing
test("upcomingTalks function passes: first subject is 'Database testing'", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      db_helpers.upcomingTalks('2019-01-02 20:00:00')
        .then(res => {
          t.deepEqual(
            res[0].subject,
            "Database testing",
            "The next subject of the next talk (as of 02/01/2019) should be 'Database testing'"
          );
          t.end();
        })
        // fail
        .catch(err => console.log('upcomingTalks with past date error: ', err));
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
      db_helpers.checkUser('mr-bagglesworth')
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
      db_helpers.checkUser('mr-bojangles')
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





// ______________________
// checkPassword function
// a) password ok
test("checkPassword function: password for user is correct", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {

      // sample object
      const loginDetails = {
        userName: 'dave',
        password: 'qwe123A@S'
      }

      db_helpers.checkPassword(loginDetails)
        // pass
        .then(res => {
          t.deepEqual(
              res,
              true,
              "The user 'dave' should exist in the test database with the password 'qwe123A@S'."
          );
          t.end();
        })
        // fail
        .catch(err => console.log('checkPassword function error: ', err));
    }
  });
});



// ______________________
// getUserId
test("getUserId function returns user id", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      db_helpers.getUserId('dave')
        // pass
        .then(res => {
          t.deepEqual(
              res,
              4,
              "Username 'dave' should have an id of 4"
          );
          t.end();
        })
        // fail
        .catch(err => console.log('getUserId function error: ', err));
    }
  });
});




// ______________________
// checkTalk function

// a) talk exists - takes a timestamp
test("checkTalk function: Talk already exists in the database", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      db_helpers.checkTalk('2018-12-29 15:00:00')
        // pass
        .then(res => {
          t.deepEqual(
              res.rows[0].exists,
              true,
              "The talk with timestamp '2018-12-29 15:00:00' should exist in the database"
          );
          t.end();
        })
        // fail
        .catch(err => console.log('checkTalk function error: ', err));
    }
  });
});






// POST

// ______________________
// addUser function
// - need to run checkUser() after user is posted, to see if user has been added to database
// 1. build database
// 2. make sample object to test
// 3. add user to database
// 4. check user has been added
test("addUser function works: requires checkUser() to see if it has worked", t => {
  // 1.
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {

      // 2.
      const newUserDetails = {
        userName: 'old-greg',
        name: 'im oooool greeeg',
        email: 'olgreg@hotmail.com',
        password: 'Qwert123@'
      }

      // 3. 
      db_helpers.addUser(newUserDetails)
        .then(res => {

          // 4. 
          db_helpers.checkUser('old-greg')
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




// ______________________
// addTalk function
// - need to run checkTalk() after talk is posted
// 1. build database
// 2. make sample object to test
// 3. add talk to database
// 4. check talk has been added
test("addTalk function works: requires checkUser() to see if it has worked", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {

      // 2. object gets formatted by addTalk.js, not addTalkToDatabase.js:
      const talkformDetails = {
        userName: 'dave', // addTalk gets user_id in talks by username in users with getUserId(userName)
        subject: 'Database Testing',
        // description: 'How to test databases with Jest as well as Tape', // add description column in build sql
        timeStamp: '2019-01-12 12:34:00',
        html: false,
        css: false,
        js: false,
        sql: false,
        node: true
      }

      // 3.
      db_helpers.addTalkToDatabase(talkformDetails)
        
      // 4.
        .then(res => {
          db_helpers.checkTalk('2019-01-12 12:34:00')
          .then(res => {
            t.deepEqual(
                res.rows[0].exists,
                true,
                "addTalk() works as talk with timestamp '2019-01-12 12:34:00' gets added to the database"
            );
            t.end();
          })
          // checkTalk fail
          .catch(err => console.log('checkTalk function error: ', err));
        })

        // addTalk fail
        .catch(err => console.log('addTalk function error: ', err));
    }
  });
});