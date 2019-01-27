// addTalk route handler - backend
// - handles addTalk POST request
// - may be tricky to test

// get controllers - for data processing
const controllers = require("../controllers/index");
// database helpers
const db_helpers = require("../database/db_helpers/index");


// 1. handle error messages, send back to frontend
// 2. match username to user id in database
// 3. create timestamp from day and time, and talkDetails object
// 4. add talk to database
// 5. give a thunder crack, and update the dashboard

const addTalk = (req, res) => {
    
    // 1.
    // - get form data
    // console.log(req.body);
    const {userName, subject, description, day, time, html, css, js, sql, node} = req.body;

    // perform some validation
    if (!subject && !day && !time) {
        return res.status(400).send({ error: true, message: 'Please fill subject, day, and time' })
    }
    const { nameValid, textareaValid } = controllers.formValidation;
    // - check subject and description
    // NOTE: add description in build sql
    if (!nameValid(subject) && !textareaValid(description)){
        return res.status(400).send({ error: true, message: 'Please enter valid data' })
    }


    // 2. 
    db_helpers.getUserId(userName)
        .then(id => {

            console.log(id);

            // 3.
            // need to do a better job with the timestamp, it is not sortable on the frontend
            // - this could be due to the sorting function, not necessarily timestamp formatting
            const timeStamp = `${day} ${time}:00`;
            const talkDetails =  { id, subject, timeStamp, html, css, js, sql, node };

            // 4. 
            db_helpers.addTalkToDatabase(talkDetails)
                .then(response => {
                    return res.status(200).send({ success: true, message: '🎉 Congrats! Your talk has been booked 🎉' });
                })
                // talk failed to add
                .catch(err => {
                    return res.status(409).send({ error: true, message: '😕 Failed to book your talk. Please try again later. 😕' })
                });

        })
        // catch error
        .catch(err => {
            console.log('getUserId error: ', err)
            return res.status(500).send({ error: true, message: 'Internal server error' })
        })  

};

module.exports = addTalk;