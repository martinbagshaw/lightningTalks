// DOM index.js
// - universal script, controls the menu
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