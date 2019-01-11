// signup form
"use strict";

/*
may want to add validation functions in dom-helpers.js
    - could be used on multiple forms
*/

// ___________________________________
// get form elements
const signupForm = document.getElementById('signup-form');
const userName = document.getElementById('username');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
// error message
const errorMessage = document.getElementById('error-message');


// ___________________________________
// validation functions
// - pass in confirm password value:
const passwordStrong = function(value){
    return value.length === 0 || RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})').test(value)
};
const passwordsMatch = function(value){
    return password.value === value
};



// ___________________________________
// add input validation here

// - this should work for all text inputs
const inputError = function(element, errorCondition, errorMsg) { 
    element.addEventListener('blur', e => {

        // validated by pattern attribute
        if (errorCondition === null && e.target.validity.valid || !e.target.validity.typeMismatch) {
            element.classList.remove('error-red');
            errorMessage.textContent = '';
        }

        // validated by js function
        else if (errorCondition !== null && errorCondition(e.target.value)) {
            element.classList.remove('error-red');
            errorMessage.textContent = '';
        } else {
            element.classList.add('error-red');
            errorMessage.textContent = errorMsg;
        }
    });
};

inputError(userName, null, 'Usernames cannot contain numbers, special characters, or spaces');
inputError(name, null, 'Names cannot contain numbers or special characters');
inputError(email, null, 'Please enter a valid email address');
inputError(password, passwordStrong, 'Passwords must contain 1 uppercase, 1 lowercase letter, 1 number or special character and be at least 8 characters long');
inputError(confirmPassword, passwordsMatch, 'Both passwords must match');



// ___________________________________
// form submit event
signupForm.addEventListener('submit', e => {

    // prevent form from submitting by default
    e.preventDefault();

    // perform validation checks
    if (
        userName.value.length > 0 && userName.validity.valid &&
        name.value.length > 0 && name.validity.valid &&
        !email.validity.typeMismatch &&
        password.value.length > 8 && passwordStrong(password.value) &&
        passwordsMatch(confirmPassword.value)
    ) {

        // if passes validation checks, compose data, and run POST request
        const signupData = JSON.stringify({
            userName : userName.value,
            name: name.value,
            email: email.value,
            password: password.value
        });

        
        // POST request
        fetch('/signup', { 
            headers: { 'content-type': 'application/json' },
            method: 'POST', 
            body: signupData 
        })
            // do stuff with response object
            .then(res => res.json())
            .then(res => {
                // console.log('got result: ', res);
                // error message - user exists, or something else?
                if (res.error){
                    // console.log('form error');
                    errorMessage.textContent = res.message;
                }
                // redirect to dashboard
                // - Can't seem to do this on the backend
                else if (res.success) {
                    window.location = '/dashboard';
                }
            })
            // catch promise error
            .catch(err => {
                // console.log('signup fetch error: ', err);
                errorMessage.textContent = 'There has been an error submitting your form. Please try again later.';
            })

    }
    // validation fails
    else {
        // console.log('signup form error');
        errorMessage.textContent = 'Please complete the form correctly before submitting';
    }

})