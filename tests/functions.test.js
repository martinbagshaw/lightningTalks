// test frontend functions here as well
// - use module.exports conditional in frontend files
const test = require("tape");
const helperIndex = require("../src/views/helpers/index");


// uppercase function
test('uppercase function is working', t => {
    const actual = helperIndex.upperCase('something');
    const expected = 'SOMETHING';
    t.equals(actual, expected), 'uppercase function with one word';
    t.end();
})