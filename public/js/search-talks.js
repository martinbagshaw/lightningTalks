"use strict";
/*
This file requires dom-helpers.js to work

- autocomplete: search by subject, speaker, or tag
- history button: view past talks
- sort button: sort date ascending and descending
*/

// fetch data
const allTalks = [];
fetch("/search-talks")
  .then(res => res.json())
  .then(data => allTalks.push(...data));






// ____________________________________
// Sort function(s)

// filter out old talks
const upcomingTalks = (arr, date) => {
  // deep clone the array of objects
  const newArr = JSON.parse(JSON.stringify(arr));
  // if datetime on an array item is less than the current date, filter it out
  const returnArr = newArr.filter(talk => new Date(talk.datetime) > date);
  return returnArr;
}


// sort talks - event handler
// - needs refactoring to work with history
const sortList = e => {
  e.preventDefault();

  const exit = document.getElementById('history').classList.contains('descending');
  if (exit) return false;

  // button
  e.target.closest('button').classList.toggle('descending');
  const order = document.getElementById('date-sort').classList.contains('descending');

  // sort function
  const upcoming = upcomingTalks(allTalks, new Date());
  const sorted = sortDate(upcoming, order);

  // return html
  html(sorted);
};





// ____________________________________
// History function(s)

// filter out new talks
const passedTalks = (arr, date) => {
  const newArr = JSON.parse(JSON.stringify(arr));
  // if datetime on an array item is greater than the current date, filter it out
  const returnArr = newArr.filter(talk => new Date(talk.datetime) < date);
  return returnArr;
}


// past and future talks - event handler
const pastFuture = e => {
  e.preventDefault();

  // button
  e.target.closest('button').classList.toggle('descending');
  const order = document.getElementById('history').classList.contains('descending');
  const text = e.target.closest('a').childNodes[0];
  order ? text.nodeValue = 'Future Talks' : text.nodeValue = 'Past Talks';

  // past and future functions
  const talks = order ? passedTalks(allTalks, new Date()) : upcomingTalks(allTalks, new Date());

  // return html
  html(talks);
}







// ____________________________________
// output html
// - this function is used by all 3 features
const html = arr => {
  // const numbers = {
  //   1: "one",
  //   2: "two",
  //   3: "three",
  //   4: "four",
  //   5: "five"
  // };
  // - could use this area for another helper function

  const outputHtml = arr
    .map(item => {
      return `
      <li class="talk-event">
        <h3 class="talk-subject">${item.subject}</h3>
        <article class="talk-meta">
          <article class="talk-details">
            <p class="speaker">${item.username} <span>a.k.a. ${item.name}</span></p>
            <p class="date-time">${dateFormat(item.datetime)}<span>@ ${timeFormat(item.datetime)}</span></p>
          </article>
          <article class="talk-tags">
              ${item.html ? '<span class="tag html">html</span>' : ''}
              ${item.css ? '<span class="tag css">css</span>' : ''}
              ${item.js ? '<span class="tag js">js</span>' : ''}
              ${item.sql ? '<span class="tag sql">sql</span>' : ''}
              ${item.node ? '<span class="tag node">node</span>' : ''}
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
const dateSort = document.getElementById('date-sort');
dateSort.addEventListener('click', sortList);

const toggleHistory = document.getElementById('history');
toggleHistory.addEventListener('click', pastFuture);






// // - get buttons
// const langButtons = Array.from(
//   document.querySelectorAll(".language-search .button-submit")
// );
// // - attach event listener and function
// langButtons.forEach(btn => btn.addEventListener("click", sortList));




// // name search
// const nameSearch = document.getElementById("name-search-button");
// nameSearch.addEventListener("click", e => {
//   e.preventDefault();

//   // make entered name in same format as name property in json
//   const textInput = document.getElementById("name-search");
//   const textLabel = document.getElementById("name-label");
//   // format
//   const firstLetter = textInput.value
//     .toLowerCase()
//     .charAt(0)
//     .toUpperCase();
//   const formatted = firstLetter + textInput.value.substr(1);

  
//   // no value entered
//   if (formatted.length < 2) {
//     // console.log("value must be more than 2");
//     textInput.classList.add('error-red');
//     textLabel.textContent = 'Please enter a string of more than 2 characters';
//   }
//   // value entered
//   else {

//     // find the name in the json list
//     const nameFind = facers => {
//       return facers.name === formatted;
//     };
//     const person = allPeeps.find(nameFind);

    
//     // no person match
//     if (person === undefined) {
//     //   console.log("no person found");
//       textInput.classList.add('error-red');
//       textLabel.textContent = 'User not found in database';
//     }
//     // person found
//     else {
//       const arr = [];
//       arr.push(person);
//       html(arr);
//     }
//   }
// });



// // reset name search
// const nameInput = document.getElementById("name-search");
// nameInput.addEventListener('input', e => {
//     if (e.target.classList.contains('error-red')) {
//         e.target.classList.remove('error-red');
//         document.getElementById("name-label").textContent = 'Search by Name';
//     } 
// })









