// add (and probably edit) talk
const db = require('../db_connection');

// 1. username is entered automatically - match in cookie perhaps?
// 2. users table queried, returning id
// 3. talks table inserted into, using returned id
//    - test with a checkTalk function - similar to checkUser
const addTalkToDatabase = talkDetails => {
    
    // destructure details
    const { id, subject, timeStamp, html, css, js, sql, node } = talkDetails;

    return new Promise((resolve, reject) => {

        db.query(
        "INSERT INTO talks (user_id, subject, datetime, html, css, js, sql, node) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [id, subject, timeStamp, html, css, js, sql, node],
        (fail, success) => {
            if (fail) reject(fail);
            else resolve(success.rows);
        });

    });
}

module.exports = addTalkToDatabase;