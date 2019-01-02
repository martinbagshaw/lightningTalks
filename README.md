# :zap: Lightning Talks :zap:
An extension of Founders and Coders Week 7 project, [FAC YAK](https://github.com/fac-15/FAC-YAK). A system for members of [FAC 15](https://github.com/fac-15) to arrange lightning talks, short presentations on topics of their choosing.

![lightning storm](https://i.giphy.com/media/FZzbTJyRTwPuw/source.gif)

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


---

### Checklist
1. ~~User Stories~~
2. ~~Create folder and file structure~~
3. ~~Add basic files (some empty)~~
4. ~~`npm init` to make a package.json~~
5. ~~List dependencies and dev dependencies in package.json~~
6. ~~`npm i` to install all dependencies~~
7. ~~Get a basic frontend working (scss and .hbs drafting, splash page)~~
8. ~~Map User flow~~
9. ~~Plan a database structure (similar to FAC YAK, but allow for scaling and editing)~~
10. ~~Decide upon where to build test and production database, and how to test database~~
11. ~~Build test and development database, and get working, do some tests~~
12. ~~Do some other tests (supertest etc), and combine all tests into one~~
13. ~~First commit~~

14. Display Talks and start implementing search function (similar to Meet the FACers)
    - search for talks by user
    - by date
    - by topic
    - by language
    - bear in mind front end validation workshop
    - hide / grey past talks
15. Get Travis CI and codecov working
16. Set up es-lint and prettier to enforce style guides (look at warning sign in bottom right of vs code)
17. Architect user flow (protected routes, identify user name and details, change buttons on login/out)

18. Handlebars templates:
    - splash page
    - create profile
    - login
    - view talks (and search for them on the frontend)
    - add and edit talks (dashboard) - protected route
    - - how to change body class per page?
