// dashboard only scripts - frontend
// - requires dom-helpers.js
"use strict";

// ___________________________________
// get form elements
const addTalkForm = document.getElementById('add-talk-form');
const subject = document.getElementById('subject');
const description = document.getElementById('description'); // custom validation function for textarea
// probably only need to worry about these for older browsers that default to input type=text
// const day = document.getElementById('day');
// const time = document.getElementById('time');
// checkboxes
const html = document.getElementById('html');
const css = document.getElementById('css');
const js = document.getElementById('js');
const sql = document.getElementById('sql');
const node = document.getElementById('node');

// create array of selectors
// const elem = name => {
//   return name.map(a => document.getElementById(`${a}`))
// }
// console.log(elem('css'));


// _____________________________________
// fail and success messages (and effects!)
// error message
const errorMessage = document.getElementById('error-message');
// success message
const successMessage = document.getElementById('success-message');
// thunder
const thunder = document.querySelector(".thunder-success"); // get sound




// ___________________________________
// validation functions - from dom-helpers.js, on blur
// - anything with null as an argument uses pattern attribute
inputError(subject, null, 'Subject must be 3 over characters long, and cannot special characters');
inputError(description, textareaValid, 'Description must be between 20 and 200 characters, and cannot special characters');
// - need to add special chars


// ___________________________________
// get username
// - jwt should always be defined if logged in
const myJwt = document.cookie.split(' ').find(cookie => cookie.includes('lightningJwt'));
if (myJwt !== undefined) {
  const payload = myJwt.split('.')[1];
  const username = JSON.parse(window.atob(payload)).userName;


  // ___________________________________
  // 1. add username to dashboard
  document.getElementById('username').innerHTML = `Hello <span class="username">${username}</span>`;


  // ___________________________________
  // 2. use username to post the form
  // form submit event
  addTalkForm.addEventListener('submit', e => {
    e.preventDefault();


    // a. perform validation checks
    if (
      subject.value.length > 0 && subject.validity.valid &&
      textareaValid(description.value)
    ) {

      // b. create object to send to server
      const addTalkData = JSON.stringify({
        userName : username, // need to convert to user id on backend
        subject : subject.value,
        description : description.value,
        day : day.value, // need to convert day and time to timestamp on backend
        time : time.value,
        html : html.checked,
        css : css.checked,
        js : js.checked,
        sql : sql.checked,
        node : node.checked
      });

      // POST request
      fetch('/addtalk', { 
        headers: { 'content-type': 'application/json' },
        method: 'POST', 
        body: addTalkData 
      })

        
      
        // database stuff first...
        
        // c. do stuff with response object
        .then(res => res.json())
        .then(res => {
            // error adding the talk
            if (res.error){
                errorMessage.textContent = res.message;
            }
            // redirect to dashboard
            // - Can't seem to do this on the backend
            else if (res.success) {
                // deliver a success message, and show new talk in the dashboard
                successMessage.textContent = res.message;
                window.location = '/dashboard#your-talks';
                thunder.currentTime = 0; // start at 0
                thunder.play();
            }
        })
        // catch promise error
        .catch(err => {
            // console.log('signup fetch error: ', err);
            errorMessage.textContent = 'There has been an error submitting your form. Please try again later.';
        })



    } // end validation checks


    // validation fails
    else {
      // console.log('signup form error');
      errorMessage.textContent = 'Please complete the form correctly before submitting';
    }



  });




} // end logged in check









// use username to post the form
// - modularise the fetch request used in login and signup
// - add to dom helpers
// - call it here


// get request:
// - user's talks
// - user's bookmarks