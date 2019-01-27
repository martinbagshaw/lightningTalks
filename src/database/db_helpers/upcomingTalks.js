const db = require('../db_connection');

// upcoming talks (takes timestamp in format '2019-01-02 20:00:00')
// - test dates entered for this are way in the past or future
const upcomingTalks = timeStamp => {

    return new Promise((resolve, reject) => {
        db.query('SELECT subject, username, name, datetime, html, css, js, sql, node FROM talks inner join users on users.id = talks.user_id AND talks.datetime > $1',
        [timeStamp],
        (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res.rows);
            }
        })
    })
}

module.exports = upcomingTalks;