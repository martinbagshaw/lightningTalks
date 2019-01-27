const db = require('../db_connection');
// enter username, get user id
const getUserId = userName => {

    return new Promise((resolve, reject) => {

        db.query('SELECT id FROM users WHERE username = $1',
        [userName],
        (err, res) => {
            if (err) {
                reject('no id for user found in the database ', err);
            }
            else {
                resolve(res.rows[0].id);
            }
        })
    })

}
module.exports = getUserId;