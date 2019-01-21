// helper functions used in the DOM
"use strict";

const dateFormat = str => {
    const arr = str.split('T')[0].split('-');
    return `${arr[2]}/${arr[1]}/${arr[0]}`;
}

const timeFormat = str => {
    return str.split('T')[1].match(/([^:]*:){2}/)[0].slice(0, -1);
}


// sort by date, bears in mind the following:
// - can't just reverse the array, talks may not be entered in chronological order
// - needs to be versatile - not just take upcoming items array
const sortDate = (arr, order) => {
    order = !order;
    arr.sort(function (a, b) {
      const x = a.datetime;
      const y = b.datetime;
      return (order ? 1 : -1);
    });
    return arr;
};




// ___________________________________
// validation functions
// - pass in confirm password value:
const passwordStrong = value => {
    return value.length === 0 || RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})').test(value)
};
const passwordsMatch = value => {
    return password.value === value
};
// - textarea validation
// - add somthing to stop = and <> from being entered / only text and numbers
const textareaValid = value => {
    return value.length === 0 || RegExp('(?=.{10,200}$)').test(value)
}


// _______________
// TO TEST:
// input error needs to work with pattern attr AND js validation
// a) pattern (null error condition passed in)
// - username and name = validity.valid
// - email = validity.typeMismatch
// b) js
// - password and confirm password
const inputError = (element, errorCondition, errorMsg) => { 
    element.addEventListener('blur', e => {
        // remove error
        if (
        // validated by pattern attribute in html
        element.type === 'text' && element.validity.valid === true ||
        element.type === 'email' && element.validity.typeMismatch === false || 
        // validated by js function
        errorCondition !== null && errorCondition(element.value)
        ) {
            element.classList.remove('error-red');
            errorMessage.textContent = '';
        }
        // add error
        else {
            element.classList.add('error-red');
            errorMessage.textContent = errorMsg;
        }
    });
};




// export functions for testing
if (typeof module !== "undefined") {
    module.exports = {
        dateFormat,
        timeFormat,
        sortDate,
        passwordStrong,
        passwordsMatch,
        // textareaValid
        // to test - can't really test
        // inputError
    };
}