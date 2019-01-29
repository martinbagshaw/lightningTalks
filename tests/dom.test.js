// test all dom helper functions here
// - modularised functions for the dom, e.g. form validation, date formatting
const test = require("tape");
const domHelpers = require("../public/js/dom-helpers.js");

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





// ______________________
// timeAsc
test('timeAsc sorts most recent first', t => {
    const inputDates = [
        { datetime: "2018-12-29T15:00:00.000Z" },
        { datetime: "2019-01-10T13:00:00.000Z" },
        { datetime: "2019-01-15T17:30:00.000Z" },
        { datetime: "2019-01-29T15:00:00.000Z" }
    ];
    t.deepEqual(
        inputDates.sort(domHelpers.timeAsc),
        [
            { datetime: "2019-01-29T15:00:00.000Z" },
            { datetime: "2019-01-15T17:30:00.000Z" },
            { datetime: "2019-01-10T13:00:00.000Z" },
            { datetime: "2018-12-29T15:00:00.000Z" }
            
        ],
        "timeAsc function sorts recent timestamp first if entered order = true"
    );
    t.end();
})

// timeDesc
test('timeDesc sorts oldest first', t => {
    const inputDates = [
        { datetime: "2018-12-29T15:00:00.000Z" },
        { datetime: "2019-01-10T13:00:00.000Z" },
        { datetime: "2019-01-15T17:30:00.000Z" },
        { datetime: "2019-01-29T15:00:00.000Z" }
    ];
    t.deepEqual(
        inputDates.sort(domHelpers.timeDesc),
        [
            { datetime: "2018-12-29T15:00:00.000Z" },
            { datetime: "2019-01-10T13:00:00.000Z" },
            { datetime: "2019-01-15T17:30:00.000Z" },
            { datetime: "2019-01-29T15:00:00.000Z" }
            
        ],
        "timeDesc function sorts oldest timestamp first if entered order = false"
    );
    t.end();
})



// sortDate
test('sortDate sorts ascending if order = true', t => {
    const inputDates = [
        { datetime: "2018-12-29T15:00:00.000Z" },
        { datetime: "2019-01-10T13:00:00.000Z" },
        { datetime: "2019-01-15T17:30:00.000Z" },
        { datetime: "2019-01-29T15:00:00.000Z" }
    ];
    t.deepEqual(
        domHelpers.sortDate(inputDates, true),
        [
            { datetime: "2019-01-29T15:00:00.000Z" },
            { datetime: "2019-01-15T17:30:00.000Z" },
            { datetime: "2019-01-10T13:00:00.000Z" },
            { datetime: "2018-12-29T15:00:00.000Z" }
            
        ],
        "sortDate function sorts recent timestamp first if entered order = true"
    );
    t.end();
})
// // - sort array of objects by timestamp (oldest first)
test('sortDate sorts descending if order = false', t => {
    const inputDates = [
        { datetime: "2018-12-29T15:00:00.000Z" },
        { datetime: "2019-01-10T13:00:00.000Z" },
        { datetime: "2019-01-15T17:30:00.000Z" },
        { datetime: "2019-01-29T15:00:00.000Z" }
    ];
    t.deepEqual(
        domHelpers.sortDate(inputDates, false),
        [
            { datetime: "2018-12-29T15:00:00.000Z" },
            { datetime: "2019-01-10T13:00:00.000Z" },
            { datetime: "2019-01-15T17:30:00.000Z" },
            { datetime: "2019-01-29T15:00:00.000Z" }
            
        ],
        "sortDate function sorts oldest timestamp first if entered order = false"
    );
    t.end();
})





// ______________________

// form validation - frontend
// - test the input element as an object
// - can't test really
// test('inputError adds error class and message if text input is invalid', t => {
//     const element = {
//         type: 'text',
//         validity: {valid: false},
//         classList: ''
//     };
//     const message = 'Names must be 3 over characters long, and contain numbers or special characters';
//     t.deepEqual(
//         domHelpers.inputError(element, null, message),
        
//             { classList: 'error-red' }
            
//         ,
//         "inputError function returns an error if: input = invalid, and error condition function = null (validated by pattern attribute)"
//     );
//     t.end();
// })