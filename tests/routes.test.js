// test routes with supertest and tape
const test = require("tape");
const request = require("supertest");
const app = require("../src/app");

// ______________________
// GET
test("Check home route returns a 200", t => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          t.equal(res.status === 200, true);
          t.end();
        }
    });
});

test("Check view talks route returns a 200", t => {
    request(app)
      .get("/view-talks")
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          t.equal(res.status === 200, true);
          t.end();
        }
    });
});

// this one could change if logged in - should redirect, with 301
// - could redirect to dashboard, as user is already logged in
test("Check login route returns a 200", t => {
    request(app)
      .get("/login")
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          t.equal(res.status === 200, true);
          t.end();
        }
    });
});

// this one could change if logged out - should redirect, with 301
// - how can I test with cookie / jwt?
// - should be 301 by default
test("Check dashboard route returns a 200", t => {
    request(app)
      .get("/dashboard")
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          t.equal(res.status === 200, true);
          t.end();
        }
    });
});

test("Check 404 error route returns a 404", t => {
    request(app)
      .get("/jkgvsdfe")
      .expect(404)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          t.equal(res.status === 404, true);
          t.end();
        }
    });
});



// ______________________
// POST