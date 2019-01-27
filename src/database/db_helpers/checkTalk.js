const db = require('../db_connection');
// check if a talk in the database

// - check by timestamp (most specific way)
const checkTalk = timeStamp => {
  const query = 'SELECT EXISTS(SELECT 1 FROM talks WHERE datetime = $1)';
  return db.query(query, [timeStamp]);
};

module.exports = checkTalk;