[![Build Status](https://travis-ci.org/mr-bagglesworth/lightningTalks.svg?branch=master)](https://travis-ci.org/mr-bagglesworth/lightningTalks) [![codecov](https://codecov.io/gh/mr-bagglesworth/lightningTalks/branch/master/graph/badge.svg)](https://codecov.io/gh/mr-bagglesworth/lightningTalks)

# :zap: Lightning Talks :zap:
[fac-lightning-talks.herokuapp.com](http://fac-lightning-talks.herokuapp.com/)
An extension of Founders and Coders Week 7 project, [FAC YAK](https://github.com/fac-15/FAC-YAK). A system for members of [FAC 15](https://github.com/fac-15) to arrange lightning talks, short presentations on topics of their choosing.

![lightning storm](https://media.giphy.com/media/3o7qE4opCd6f1NJeuY/giphy.gif)

## User Stories
As a member of FAC 15, I want to...
- Arrange a time for my lightning talk that won't clash with other course activities
- See a schedule of upcoming lightning talks
- Ensure that my lightning talk does not clash with someone else's talk
- Re-arrange my lightning talk should the time not suit others or myself any more
- Re-arrange my lightning talk details, should I wish to talk about another subject
- Not have others modify the time, or any details relating to my talk

![thumbs up](https://media.giphy.com/media/7PwOZJLNYUkU/giphy.gif)

---

### Setup Instructions
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
[notes and lessons can be found here](https://hackmd.io/RarWZD4WQvmFmusjTMCG8Q)

### Checklist
1. [x] ~~User Stories~~
2. [x] ~~Create folder and file structure~~
3. [x] ~~Add basic files (some empty)~~
4. [x] ~~`npm init` to make a package.json~~
5. [x] ~~List dependencies and dev dependencies in package.json~~
6. [x] ~~`npm i` to install all dependencies~~
7. [x] ~~Get a basic frontend working (scss and .hbs drafting, splash page)~~
8. [ ] Map User flow (this one keeps getting iterated over as the project progresses)
9. [x] ~~Plan a database structure (similar to FAC YAK, but allow for scaling and editing)~~
10. [x] ~~Decide upon where to build test and production database, and how to test database~~
11. [x] ~~Build test and development database, and get working, do some tests~~
12. [x] ~~Do some other tests (supertest etc), and combine all tests into one~~
13. [x] ~~First commit~~

14. [x] ~~Display Talks and start implementing search function (similar to Meet the FACers)~~
    - [x] ~~search for talks by user~~
    - [x] ~~show previous talks as greyed out / add a note to say they have passed~~
    - [x] ~~by subject~~
    - [x] ~~by language~~
    - [x] ~~bear in mind front end validation workshop (more important for signup and login)~~
    - [x] ~~hide / grey past talks~~

15. ~~Get Travis CI and codecov working~~
    - [x] ~~requires heroku database~~
    - [x] ~~requires env variable for database to be set in travis~~
    - [x] ~~requires live database to be built with same dummy info as test database - used Heroku CLI with psql.~~

16. - [ ] Set up es-lint and prettier to enforce style guides (look at warning sign in bottom right of vs code)
17. - [ ] Architect user flow (protected routes, identify user name and details, change buttons on login/out). Basically point 8 above, again.

18. Clean up scss
    - [ ] Remove stuff I don't need
    - [ ] Refactor and made it smarter
    - [x] ~~Use big search bar [emotiQuote](https://emotiquote.herokuapp.com/)~~
 
19. Handlebars templates:
    - [x] ~~splash page~~
    - [x] ~~view talks (and search for them on the frontend)~~
        - [x] ~~past talks~~
        - [x] ~~order talks~~
        - [x] ~~autocomplete [reuse emotiQuote](https://emotiquote.herokuapp.com/)~~
            - [x] ~~with name, username, and subject~~
            - [x] ~~with language tags (change output of languages to an array)~~
            - [x] ~~remove list when there are no results~~
            - [x] ~~click list item > ~~show in searchbar > click submit >~~ get talk html~~S
    - [ ] signup
        - [x] ~~check user exists in database~~
        - [x] ~~add error message if so~~
        - [x] encrypt user password
        - [x] add user entry to the database
        - [x] give user a login cookie / jwt
        - [x] allow user to view protected route (dashboard)
        - [ ] show logout button and hide login and signup buttons
    - [ ] login
        - [ ] decrypt user password
    - [ ] dashboard - a protected route
        - [ ] add talks
        - [ ] edit talks
        - [ ] see other FAC events
        - [ ] bookmark talks
        - [ ] set reminders
    - [ ] change body class per page (how to do this?)
    - [ ] load scripts for each page async in header
