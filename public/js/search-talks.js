"use strict";

// fetch data

const allTalks = [];
fetch("/search-talks")
  .then(res => res.json())
  .then(data => allTalks.push(...data));


// // sort by language
// // - sort function
// const sortLang = lang => {
//   // would like to be able to toggle order without a global variable:
//   // https://stackoverflow.com/questions/44661710/how-to-toggle-sort-in-javascript
//   allPeeps.sort((a, b) => {
//     const personA = a[lang];
//     const personB = b[lang];
//     // order ascending
//     if (personA < personB) {
//       return 1;
//     }
//     if (personA > personB) {
//       return -1;
//     }
//     return 0;
//   });
//   return allPeeps;
// };




// // sort the list ascending
// const sortList = e => {
//   e.preventDefault();
//   const lang = e.target.value.toLowerCase();
//   const sorted = sortLang(lang);
//   html(sorted);
// };

// // output html
// const html = arr => {
//   const numbers = {
//     1: "one",
//     2: "two",
//     3: "three",
//     4: "four",
//     5: "five"
//   };

//   const outputHtml = arr
//     .map(item => {
//       return `
//         <li class="cohort-member">
//             <h3 class="name">${item.name}</h3>
//             <article class="bio">${item.bio}</article>
//             <article class="skills">
//                 <span>Skills:</span>
//                 <div class="html">
//                     <span>HTML level:</span>
//                     <div class=${numbers[item.html]}></div>
//                 </div>
//                 <div class="css">
//                     <span>CSS level:</span>
//                     <div class=${numbers[item.css]}></div>
//                 </div>
//                 <div class="js">
//                     <span>JS level:</span>
//                     <div class=${numbers[item.js]}></div>
//                 </div>
//                 <div class="sql">
//                     <span>SQL level:</span>
//                     <div class=${numbers[item.sql]}></div>
//                 </div>
//                 <div class="node">
//                     <span>NODE level:</span>
//                     <div class=${numbers[item.node]}></div>
//                 </div>
//             </article>
//         </li>
//         `;
//     })
//     .join("");

//   const ul = document.querySelector(".cohort-list");
//   ul.innerHTML = outputHtml;
// };





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