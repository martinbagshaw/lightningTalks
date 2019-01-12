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

// view talks
// - outputtting upcoming talks based on the current date, not pure
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


// search talks
test("Check search talks route returns a 200 and content type of json", t => {
  request(app)
    .get("/search-talks")
    .expect(200)
    .expect("Content-Type", /application\/json/)
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        t.equal(res.status === 200, true);
        t.end();
      }
  });
});



// ______________________
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


// - dashboard should be 301 by default - user not logged in
test("Check dashboard route returns a 403 - user forbidden / not logged in", t => {
    request(app)
      .get("/dashboard")
      .expect(403)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          t.equal(res.status === 403, true);
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
// - test signup route - required from routes/index.js

// - need to test the rest of the function elsewhere I think - more functional than route based?
// - supertest post request, passing in data, as well as route

// - bad request entered, need to run signup function to return more specifics
test("Check signup returns a 400 bad request if no details are entered", t => {
  request(app)
    .post("/signup")
    .expect(400)
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        t.equal(res.status === 400, true);
        t.end();
      }
  });
});


// - test signup with details already in the database
const inDataBase = {
  body : {
    userName: 'mr-bagglesworth',
    name: 'Martin',
    email: 'martin@martin.com',
    password: 'ahsgdv75q2e£2gc4vy215er'
  }
}
test("POST signup/ returns 409 status with request details that are in the test database already", t => {
  request(app)
    .post("/signup")
    .type('form')
    .send(inDataBase.body)
    .set('Accept', /application\/json/)
    .expect(409)
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        t.equal(res.status === 409, true);
        t.end();
      }
  });
});


// - test signup with details NOT in the database already
const notInDataBase = {
  body : {
    userName: 'mr-bojangles',
    name: 'Bo Jingle Jangles',
    email: 'bo@jangles.com',
    password: 'ahsgdv75q234c£2gc4vy215er'
  }
}
test("POST signup/ returns 302 status with request details that are NOT in the test database already", t => {
  request(app)
    .post("/signup")
    .type('form')
    .send(notInDataBase.body)
    .set('Accept', /application\/json/)
    .expect(302)
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        t.equal(res.status === 302, true);
        t.end();
      }
  });
});