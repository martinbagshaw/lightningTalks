// dashboard only scripts - frontend
// - requires dom-helpers.js
"use strict";

// 1. show username
// 2. make add talk form work
// 3. show users talks (handle on server side didn't seem to work out)
// 4. show users bookmarked talks




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


// _____________________________________
// fail and success messages (and effects!)
// - form messages
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
// - thunder
const thunder = document.querySelector(".thunder-success"); // get sound
// - user talks
const talksMsg = document.getElementById('your-talks-message');


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
// console.log(myJwt);

if (myJwt !== undefined) {
  const payload = myJwt.split('.')[1];
  // console.log(payload);
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
                // sound
                thunder.currentTime = 0; // start at 0
                thunder.play();
                // talks
                talksMsg.textContent = '';
                // run something to refresh / populate talks list
                fetchTalks();
                // reset form
                addTalkForm.reset();
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














// use username to post the form
// - modularise the fetch request used in login and signup
// - add to dom helpers
// - call it here




// get request:
// - user's talks
// - user's bookmarks




// ____________________________________
// 3. user's talks list



const talksByUser = (talks, username) => {
  const userTalks = talks.filter(talk => talk.username === username);
  userTalks.length > 0 ? resultHtml(userTalks) : noResultHtml(talksMsg, `Hey, ${username}! You haven\'t added a talk yet. Please fill in the form above to add a talk.`);
}


const noResultHtml = (elem, msg) => {
  elem.textContent = msg;
}

// html output
// - modularise this - used in search-talks.js too
const resultHtml = arr => {

  const outputHtml = arr
    .map(item => {
      // create html for any tags that exist
      const tags = item.languages.map(tag => tag ? `<span class="tag ${tag}">${tag}</span>` : '').join('');
      // talk passed?
      const past = new Date(item.datetime) < new Date() ? ' past' :'';
      // return html
      return `
      <li class="talk-event${past}">
        <h3 class="talk-subject">${item.subject}</h3>
        <article class="talk-meta">
          <article class="talk-details">
            <p class="speaker">${item.username} <span>a.k.a. ${item.name}</span></p>
            <p class="date-time">${dateFormat(item.datetime)}<span>@ ${timeFormat(item.datetime)}</span></p>
          </article>
          <article class="talk-tags">
            ${tags}
          </article>
        </article>
      </li>
      `;
    })
    .join('');

  const ul = document.querySelector(".talks-list");
  ul.innerHTML = outputHtml;
};


// ____________________________________
// attach event listeners
// - response = allTalks from fetch
// const attachEvents = response => {

  // user's talks
  // talksByUser(response, username);
  // const talkBtn = document.getElementById('talk-btn');
  // talkBtn.addEventListener('click', e => talksByUser(e, response, username), false);

  // const dateSort = document.getElementById('date-sort');
  // dateSort.addEventListener('click', sortList);

  // const toggleHistory = document.getElementById('history');
  // toggleHistory.addEventListener('click', pastFuture);
// }


// make the fetch talks function reusable
// - needs to update on form submit
const fetchTalks = () => {
  const allTalks = [];
  fetch("/search-talks")
    .then(res => res.json())
    .then(data => allTalks.push(...data))
    // .then(attachEvents(allTalks));
    .then(data => {
      // run functions after fetch is complete
      talksByUser(allTalks, username)
    })
}

fetchTalks();







} // end logged in check