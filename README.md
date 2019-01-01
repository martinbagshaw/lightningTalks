# Lightning Talks :zap:
An extension of Founders and Coders Week 7 project, [FAC YAK](https://github.com/fac-15/FAC-YAK). A system for members of [FAC 15](https://github.com/fac-15) to arrange lightning talks, short presentations on topics of their choosing.

![lightning storm](https://media.giphy.com/media/FZzbTJyRTwPuw/source.gif)

## User Stories
As a member of FAC 15, I want to...
- ...arrange a time for my lightning talk that won't clash with other course activities
- ...see a schedule of upcoming lightning talks
- ...ensure that my lightning talk does not clash with someone else's talk
- ...re-arrange my lightning talk should the time not suit others or myself any more
- ...re-arrange my lightning talk details, should I wish to talk about another subject
- ...not have others modify the time, or any details relating to my talk

![thumbs up](https://media.giphy.com/media/7PwOZJLNYUkU/giphy.gif)

---

### Setup Instructions
1. Clone the repo
2. `npm i` to install all dependencies
3. Create the database:
    - `pgcli` or `psql`
    - **CREATE DATABASE** 
    - Set database urls in config.env
    - `node ./src/database/production_db_build.js` for local and live db build
    - `node ./src/database/test_db_build.js` for test db build


`node ./tests/database.test.js` or `npm run test` of you want colours and things.


---

### My process
1. User Stories
2. Create folder and file structure
3. Add basic files (some empty)
4. `npm init` to make a package.json
5. List dependencies and dev dependencies in package.json
6. `npm i` to install all dependencies
7. Get a basic frontend working (scss and .hbs drafting, splash page)

8. Map User flow
9. Plan a database structure (similar to FAC YAK, but allow for scaling and editing)
10. Decide upon where to build test and production database, and how to test database
11. Build test and development database, and get working, do some tests

12. Do some other tests (supertest etc), and combine all tests into one

13. First commit, get Travis CI and codecov working

14. Handlebars files to facilitate user flow
    - splash page
    - create profile
    - login
    - view talks (and search for them on the frontend)
    - add and edit talks (dashboard) - protected route
    - - how to change body class per page?
