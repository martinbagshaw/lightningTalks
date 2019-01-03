// test frontend functions here as well
// - use module.exports conditional in frontend files
const test = require("tape");
const helperIndex = require("../src/views/helpers/index");
const domHelpers = require("../public/js/dom-helpers.js");


// uppercase function
test('uppercase function is working', t => {
    const actual = helperIndex.uppercase('something');
    const expected = 'SOMETHING';
    t.equals(actual, expected), 'uppercase function with one word';
    t.end();
})

// timeStampFrom function
// - takes TimeStamp in object form
// - can't be tested (TimeStamp obj form is weird)
// test('timeStampFrom function is working', t => {
//     t.deepEqual(
//         helperIndex.timeStampFrom({str: '2018-12-29T15:00:00.000Z'}),
//         ['2018-12-29', '15:00'],
//         "timeStampFrom function with GMT String"
//     );

//     t.end();
// })

// date from timestamp
test('dateFromStamp function is working', t => {
    t.equals(
        helperIndex.dateFromStamp(new Date('2018-12-29T15:00:00.000Z')),
        '29/12/2018',
        "dateFromStamp function reformats the date from timestamp correctly"
    );
    t.end();
})

// time from timestamp
test('timeFromStamp function is working', t => {
    t.equals(
        helperIndex.timeFromStamp(new Date('2018-12-29T15:00:00.000Z')),
        '15:00',
        "timeFromStamp function reformats the time from timestamp correctly"
    );
    t.end();
})

// datetime to timestamp
// - impure function, converts current time to something that works with database query
// - can't even test this, it changes every minute!
// test('datetimeToStamp function is working', t => {
//     t.equals(
//         helperIndex.datetimeToStamp(new Date()),
//         '2019-01-02 21:20:00',
//         "datetimeToStamp function can't be tested, duh!"
//     );
//     t.end();
// })



// ______________
// DOM helper functions
// - date format
test('dom-helpers.js: dateFormat function is working', t => {
    const actual = domHelpers.dateFormat('2018-12-29T15:00:00.000Z');
    const expected = '29/12/2018';
    t.equals(actual, expected), 'dateFormat function works';
    t.end();
})

// - time format
test('dom-helpers.js: timeFormat function is working', t => {
    const actual = domHelpers.timeFormat('2018-12-29T15:00:00.000Z');
    const expected = '15:00';
    t.equals(actual, expected), 'timeFormat function works';
    t.end();
})