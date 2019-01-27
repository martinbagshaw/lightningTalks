// login form
"use strict";

// ___________________________________
// get form elements
const loginForm = document.getElementById('login-form');
const userName = document.getElementById('username');
const password = document.getElementById('password');
// error message
const errorMessage = document.getElementById('error-message');


// input validation, on blur
// - anything with null as an argument uses pattern attribute
inputError(userName, null, 'Usernames cannot contain numbers, special characters, or spaces');
inputError(password, passwordStrong, 'Passwords must contain 1 uppercase, 1 lowercase letter, 1 number or special character and be at least 8 characters long');


// ___________________________________
// form submit event
loginForm.addEventListener('submit', e => {

    // prevent form submitting by default
    e.preventDefault();

    // perform validation checks
    if (
        userName.value.length > 0 && userName.validity.valid &&
        password.value.length > 8 && passwordStrong(password.value)
    ) {

        // if passes, compose data, and run POST request
        const loginData = JSON.stringify({
            userName : userName.value,
            password: password.value
        });

        // POST request
        fetch('/login', { 
            headers: { 'content-type': 'application/json' },
            method: 'POST', 
            body: loginData 
        })
            // do stuff with response object
            .then(res => res.json())
            .then(res => {
                // console.log('got result: ', res);
                // error message - user exists, or something else?
                if (res.error){
                    // console.log('form error');
                    errorMessage.textContent = res.message;
                    console.log(res);
                }
                // redirect to dashboard
                // - can't do this on backend
                // - can't do anything other than redirect to dashboard
                else if (res.success) {
                    window.location = '/dashboard';
                }
            })
            // catch promise error
            .catch(err => {
                // console.log('login fetch error: ', err);
                errorMessage.textContent = 'There has been an error submitting your form. Please try again later.';
            })
    }


    // validation fails
    else {
        errorMessage.textContent = 'Please complete the form correctly before submitting';
    }


});