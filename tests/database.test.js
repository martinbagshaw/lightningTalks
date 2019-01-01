// database testing
// - drop and build a new database on each database test
const test = require("tape");
// testBuild function must build database synchronously
// - this allows queries to be performed on the database
const testBuild = require("../src/database/test_db_build.js");
// get database query functions
const helperIndex = require("../src/views/helpers/index");





// getTalks function
test("getTalks function is working", t => {
  testBuild((error, response) => {
    if (error) {
      console.log("testBuild error: ", error);
    } else {
      helperIndex.getTalks((err, res) => {
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