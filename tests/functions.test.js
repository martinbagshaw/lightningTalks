// test frontend functions here as well
// - use module.exports conditional in frontend files
const test = require("tape");
const helperIndex = require("../src/views/helpers/index");


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