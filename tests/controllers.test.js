// - data processing functions (that don't interact directly with the database)
const test = require("tape");
const controllers = require("../src/controllers/index");


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
        controllers.jsonOutput(inputArr),
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
// form validation - backend

// - username passes
test('username checker function is working', t => {
    const actual = controllers.formValidation.usernameValid('Martin');
    const expected = true;
    t.equals(actual, expected), '"Martin" is a valid username';
    t.end();
})
test('username can\'t include a special character', t => {
    const actual = controllers.formValidation.usernameValid('@Martin');
    const expected = false;
    t.equals(actual, expected), '"@Martin" is not a valid username';
    t.end();
})
test('username can\'t include a space', t => {
    const actual = controllers.formValidation.usernameValid('Martin B');
    const expected = false;
    t.equals(actual, expected), '"Martin B" is not a valid username';
    t.end();
})


// - name passes
test('name checker function is working', t => {
    const actual = controllers.formValidation.nameValid('Martin B');
    const expected = true;
    t.equals(actual, expected), '"Martin B" is a valid username';
    t.end();
})
test('name can\'t include a number', t => {
    const actual = controllers.formValidation.nameValid('Martin 123');
    const expected = false;
    t.equals(actual, expected), '"Martin 123" is not a valid username';
    t.end();
})


// - email passes
test('email checker function is working', t => {
    const actual = controllers.formValidation.emailValid('test@example.com');
    const expected = true;
    t.equals(actual, expected), '"test@example.com" is a valid email address';
    t.end();
})
test('email must include an @ symbol', t => {
    const actual = controllers.formValidation.emailValid('testexample.com');
    const expected = false;
    t.equals(actual, expected), '"testexample.com" is not a valid email address';
    t.end();
})


// - strong password
test('strong password function is working', t => {
    const actual = controllers.formValidation.passwordStrong('qweQWE123@');
    const expected = true;
    t.equals(actual, expected), 'strong password contains uppercase, lowercase, special character and number';
    t.end();
})
test('strong password function fails with weak password', t => {
    const actual = controllers.formValidation.passwordStrong('abc123');
    const expected = false;
    t.equals(actual, expected), 'a strong password is not "abc123"';
    t.end();
})
