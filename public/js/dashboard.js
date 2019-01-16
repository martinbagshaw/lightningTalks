// dashboard only scripts
"use strict";

// get username
// - jwt should always be defined if logged in
const myJwt = document.cookie.split(' ').find(cookie => cookie.includes('lightningJwt'));
if (myJwt !== undefined) {
  const payload = myJwt.split('.')[1];
  const username = JSON.parse(window.atob(payload)).userName;
//   console.log(username);
  document.getElementById('username').innerHTML = `Hello <span class="username">${username}</span>`;
}


// use username to post the form
// - modularise the fetch request used in login and signup
// - add to dom helpers
// - call it here


// get request:
// - user's talks
// - user's bookmarks