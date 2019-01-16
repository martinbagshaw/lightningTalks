// DOM index.js
// - universal script, controls site-wide elements
"use strict";

// menu
const menuBtn = document.querySelector(".burger-menu");
menuBtn.addEventListener("click", e => {
  e.preventDefault(); // prevent scrolling to # in html
  // add open class to the hamburger and app-drawer
  e.target.closest("a").classList.toggle("open"); // use .closest to get the closest parent 'a' tag
  document.querySelector(".app-drawer").classList.toggle("open");

  // play sound on menu open
  // const audio = document.querySelector(".sound-menu"); // get sound
  // audio.currentTime = 0; // start at 0
  // audio.play();
});






// login status
// - get username if logged in (dashboard.js)
// - might be better in here in the future - if we want to show name, and do posts on different pages



// login / out buttons:
const headerBtns = Array.from(document.querySelectorAll('.auth-section button'));
const logout = headerBtns.find(btn => btn.classList.contains('logout'));
if (logout !== undefined) {
  logout.addEventListener("click", e => {
    e.preventDefault();

    // POST request
    fetch('/logout', { 
      headers: { 'content-type': 'application/json' },
      method: 'POST'
    })
      // do stuff with response object
      .then(res => res.json())
      .then(res => {
          // error message - can't logout
          if (res.error){
            console.log('logout error');
          }
          // redirect to home
          else if (res.success) {
            window.location = '/';
          }
      })
      // catch promise error
      .catch(err => {
          console.log('logout fetch error: ', err);
      })
  });
}