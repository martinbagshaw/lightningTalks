[![Build Status](https://travis-ci.org/mr-bagglesworth/lightningTalks.svg?branch=master)](https://travis-ci.org/mr-bagglesworth/lightningTalks) [![codecov](https://codecov.io/gh/mr-bagglesworth/lightningTalks/branch/master/graph/badge.svg)](https://codecov.io/gh/mr-bagglesworth/lightningTalks)

# :zap: Lightning Talks :zap:
[fac-lightning-talks.herokuapp.com](https://fac-lightning-talks.herokuapp.com/)
An extension of Founders and Coders Week 7 project, [FAC YAK](https://github.com/fac-15/FAC-YAK). A system for members of [FAC 15](https://github.com/fac-15) to arrange lightning talks, short presentations on topics of their choosing.

![lightning storm](https://media.giphy.com/media/3o7qE4opCd6f1NJeuY/giphy.gif)

## Tech Stack :books:

| **Category**           | **Technology**                                                                            |
|------------------------|-------------------------------------------------------------------------------------------|
| Languages              | JavaScript, node, HTML, SCSS, SQL                                                         |
| Frameworks & Libraries | Express, handlebars, bcrypt.js, jsonwebtoken, cookie, bodyparser, env2, pg, serve-favicon |
| Databases              | PostgreSQL                                                                                |
| Testing                | Tape, tap-spec, istanbul, nyc, supertest                                                  |
| Dev Tools / Other      | Nodemon, Travis CI, Heroku, Codecov, Github                                               |
| Quality Assurance      | Codecov, es-lint, prettier                                                                |

![thumbs up](https://media.giphy.com/media/7PwOZJLNYUkU/giphy.gif)

---

### Setup Instructions :memo:
1. Clone the repo
2. `npm i` to install all dependencies
3. Create the database(s) for test and production by:
    - logging in to postgres with `pgcli` or `psql`, then entering the following:
    - `CREATE DATABASE <database_name>`;
    - `CREATE USER <user_name> WITH SUPERUSER PASSWORD '<password>'`;
    - `ALTER DATABASE <database_name> OWNER TO <user_name>`;
    - In another terminal window, run `node ./src/database/production_db_build.js` for production database build
4. Set database urls in config.env: `DATABASE_URL = <production db>` and `TEST_DB_URL = <production db>`:
```javascript
DATABASE_URL = postgres://<user_name>:<password>@localhost:5432/<database_name>
```
5. `npm run dev` to start the project, then [port 7119](http://localhost:7119) to view.
6. `npm run test` to run tests on helper functions, routes, and database queries.
7. If you wish to edit the css, this project uses Sass (SCSS). Make sure you have [Sass installed](https://sass-lang.com/install), then go to the public folder and run `sass --watch scss:css`.

---

### File Structure

📁 public - all publicly hosted files
    - includes client side js, css, images, and sounds

📁 src - all server side files  
    📁 controllers  
        - data processing functions that don't interact directly with the database, or rendering system
    📁 database  
        - database schema, build, and connection scripts, and queries that interact directly with the database
    📁 routes  
        - handles the processing of data for different routes (GET and POST requests)
    📁 views  
        - handlebars(.hbs) files that implement server side rendering

📁 tests - all tests (run with tape)


---

### More Detail:
[checklist, notes and lessons can be found here](https://hackmd.io/RarWZD4WQvmFmusjTMCG8Q)