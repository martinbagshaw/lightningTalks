// - handlebars helpers
const test = require("tape");
const handleBars = require("../src/views/helpers/index");

// - uppercase function
test('uppercase function is working', t => {
    const actual = handleBars.uppercase('something');
    const expected = 'SOMETHING';
    t.equals(actual, expected), 'uppercase function with one word';
    t.end();
})

// - date from timestamp
// test('dateFromStamp function is working', t => {
//     t.equals(
//         handleBars.dateFromStamp(new Date('2018-12-29T15:00:00.000Z')),
//         '29/12/2018',
//         "dateFromStamp function reformats the date from timestamp correctly"
//     );
//     t.end();
// })

// // - time from timestamp
// test('timeFromStamp function is working', t => {
//     t.equals(
//         handleBars.timeFromStamp(new Date('2018-12-29T15:00:00.000Z')),
//         '15:00',
//         "timeFromStamp function reformats the time from timestamp correctly"
//     );
//     t.end();
// })