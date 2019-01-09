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








// ______________________
// jsonOutput function
// - works with database output
test('jsonOutput function is working', t => {

    const inputArr = [
        {
            id: 2,
            subject: "Database testing",
            username: "la-fosse",
            name: "Charlie",
            datetime: "2019-01-10T13:00:00.000Z",
            html: false,
            css: false,
            js: false,
            sql: true,
            node: false
        },
        {
            id: 3,
            subject: "React",
            username: "zurda",
            name: "Michal",
            datetime: "2019-01-15T17:30:00.000Z",
            html: false,
            css: true,
            js: true,
            sql: false,
            node: false
        }
    ];

    t.deepEqual(
        helperIndex.jsonOutput(inputArr),
        [
            {
                id: 2,
                subject: "Database testing",
                username: "la-fosse",
                name: "Charlie",
                datetime: "2019-01-10T13:00:00.000Z",
                languages: ['sql']
            },
            {
                id: 3,
                subject: "React",
                username: "zurda",
                name: "Michal",
                datetime: "2019-01-15T17:30:00.000Z",
                languages: ['css', 'js']
            }
        ],
        "jsonOutput function refactors languages into an array"
    );
    t.end();
})






// ________________________________________________________________________________________________________________
// form validation

// - username passes
test('username checker function is working', t => {
    const actual = helperIndex.formValidation.usernameValid('Martin');
    const expected = true;
    t.equals(actual, expected), '"Martin" is a valid username';
    t.end();
})
test('username can\'t include a special character', t => {
    const actual = helperIndex.formValidation.usernameValid('@Martin');
    const expected = false;
    t.equals(actual, expected), '"@Martin" is not a valid username';
    t.end();
})
test('username can\'t include a space', t => {
    const actual = helperIndex.formValidation.usernameValid('Martin B');
    const expected = false;
    t.equals(actual, expected), '"Martin B" is not a valid username';
    t.end();
})


// - name passes
test('name checker function is working', t => {
    const actual = helperIndex.formValidation.nameValid('Martin B');
    const expected = true;
    t.equals(actual, expected), '"Martin B" is a valid username';
    t.end();
})
test('name can\'t include a number', t => {
    const actual = helperIndex.formValidation.nameValid('Martin 123');
    const expected = false;
    t.equals(actual, expected), '"Martin 123" is not a valid username';
    t.end();
})


// - email passes
test('email checker function is working', t => {
    const actual = helperIndex.formValidation.emailValid('test@example.com');
    const expected = true;
    t.equals(actual, expected), '"test@example.com" is a valid email address';
    t.end();
})
test('email must include an @ symbol', t => {
    const actual = helperIndex.formValidation.emailValid('testexample.com');
    const expected = false;
    t.equals(actual, expected), '"testexample.com" is not a valid email address';
    t.end();
})


// - strong password
test('strong password function is working', t => {
    const actual = helperIndex.formValidation.passwordStrong('qweQWE123@');
    const expected = true;
    t.equals(actual, expected), 'strong password contains uppercase, lowercase, special character and number';
    t.end();
})
test('strong password function fails with weak password', t => {
    const actual = helperIndex.formValidation.passwordStrong('abc123');
    const expected = false;
    t.equals(actual, expected), 'a strong password is not "abc123"';
    t.end();
})











// ________________________________________________________________________________________________________________
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

// - sort date
test('dom-helpers.js: sortDate function is working', t => {
    const arr = [
        { datetime: "2018-12-29T15:00:00.000Z" },
        { datetime: "2019-01-10T13:00:00.000Z" },
        { datetime: "2019-01-15T17:30:00.000Z" }
    ]
    const order = true; // descending = true
    t.deepEqual(
        domHelpers.sortDate(arr, order),
        [
            { datetime: "2019-01-15T17:30:00.000Z" },
            { datetime: "2019-01-10T13:00:00.000Z" },
            { datetime: "2018-12-29T15:00:00.000Z" }
        ],
        "sortDate function reverses order according to datetime property"
    );
    t.end();
})