// production and live database build script
// - creates an empty database without any pre-populated valeus
const liveBuild = require('./db_build');

liveBuild('/sql/db_build.sql')
  .then(res => console.log(res))
  .catch(err => console.log(err));

module.exports = liveBuild;