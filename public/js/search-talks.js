"use strict";
/*
This file requires dom-helpers.js to work

- autocomplete: search by subject, speaker, or tag
- history button: view past talks
- sort button: sort date ascending and descending

- fetch data at the end of the file

To Do:
- autocomplete search with tag / language
- grey out past talks
- get sort button working with past and future talks (integration)
*/



// ____________________________________
// Autocomplete function(s)
// - search name, username, subject, and language


// search for matching talks
// - need to avoid matching everything
const searchTalks = (word, talks) => {
  return talks.filter(talk => {
      // word = text input value
      const regex = new RegExp(word, 'gi');

      // autocomplete with languages (if object key matches word):
      // - filter out non languages
      const tagKeys = Object.keys(talk).filter(key => key.match(/^((?!id|name|username|subject|datetime).)*$/)); // can also use a !key
      // - map returns 5 one item arrays, if any arrays not null
      const langTag = tagKeys.map(key => key.match(regex)).filter(match => match !== null)[0];

      // 1:
      // this returns one item array, so languages / tags should do too
      // console.log(talk.username.match(regex), ' username');
      // console.log(langTag, ' language');
      // langTag appears to log out the same, but does not work as expected
      // - try logging out the different parts of the langTag function to see


      // 2:
      // talk['cs'] needs to return talks for css
      // - i.e. see if property value is true without the full key
      // - can't search for 'true' or 'false' without the full key
      // --- Make a test for this function - it will be testable!

      // need a bigger dataset to test this properly
      return talk.username.match(regex) || talk.name.match(regex) || talk.subject.match(regex)
  });
};


// autocomplete - event handler
const autoComplete = (word, talks) => {

  const matches = searchTalks(word, talks);
  autocompleteHtml(matches);

  // clear the autocomplete if nothing entered
  const searchBarVal = document.getElementById('search-bar').value.length;
  if (searchBarVal === 0) {
    document.getElementById('search-suggestions').innerHTML = '';
  }
}


// display a single talk when it gets clicked on
const displayTalk = (e, talks) => {
  // get talk id from html id
  let talkId = e.target.closest('li').id;
  talkId = parseInt(talkId[talkId.length - 1]);
  // get talk from array, compose html
  const clickedTalk = talks.filter(talk => talk.id === talkId);
  resultHtml(clickedTalk);
  // clear autocomplete
  document.getElementById('search-suggestions').innerHTML = '';
}



// make sure something is entered on submit
// - doesn't work, see validation workshop
// - form submit is disabled at the moment - no required for autocomplete to work
const formValidation = e => {
  e.preventDefault();
  // const searchBar = document.getElementById('search-bar');
  // const pass = searchBar.validity.valid && searchBar.value.length > 2;
  // if (pass) {
  //   searchBar.classList.remove('error-red');
  //   searchBar.setCustomValidity('');
  // } else {
  //   searchBar.classList.add('error-red');
  //   searchBar.setCustomValidity('Enter letters a-z, and 2 or more characters');
  //   // searchBar.placeholder
  // }
}









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

  // prevent it working with history for time being:
  const exit = document.getElementById('history').classList.contains('descending');
  if (exit) return false;

  // button
  e.target.closest('button').classList.toggle('descending');
  const order = document.getElementById('date-sort').classList.contains('descending');

  // sort function
  const upcoming = upcomingTalks(allTalks, new Date());
  const sorted = sortDate(upcoming, order);

  // return html
  resultHtml(sorted);
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
  text.nodeValue = order ? 'Upcoming Talks' : 'Past Talks';

  // heading textContent as well
  const main = document.querySelector('.page-content .main-section:first-child');
  main.children[0].textContent = order ?  'Past Talks' : 'Upcoming Talks';


  // past and future functions
  const talks = order ? passedTalks(allTalks, new Date()) : upcomingTalks(allTalks, new Date());

  // return html
  resultHtml(talks);
}









// ____________________________________
// output html
// - autocomplete html
const autocompleteHtml = arr => {
  const outputHtml = arr
  // need to indicate whether the talk has passed or not
    .map(item => {
      return `<li id="search-item-${item.id}" class="search-item">${item.subject} | ${item.username} <span class="search-person">a.k.a. ${item.name}</span>
        ${item.html ? '<span class="tag html">html</span>' : ''}
        ${item.css ? '<span class="tag css">css</span>' : ''}
        ${item.js ? '<span class="tag js">js</span>' : ''}
        ${item.sql ? '<span class="tag sql">sql</span>' : ''}
        ${item.node ? '<span class="tag node">node</span>' : ''}<span class="search-arrow">→</span>
      </li>`;
    })
    .join('');
  const ul = document.getElementById("search-suggestions");
  ul.innerHTML = outputHtml;
}



// - resultHtml is used by all 3 features
const resultHtml = arr => {
  // const numbers = {
  //   1: "one",
  //   2: "two",
  //   3: "three",
  //   4: "four",
  //   5: "five"
  // };

  // could use this area for another helper function
  // - grey out old talks. Adds another layer of complexity though
  // - 
  // rgba(125, 125, 125, 0.75)

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
// - response = allTalks from fetch
const attachEvents = response => {
  // searchbar input
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', e => autoComplete(e.target.value, response), false);

  // list item click
  const suggestions = document.querySelector('#search-suggestions');
  suggestions.addEventListener('click', e => displayTalk(e, response), false);

  // bypass form functionality - no need to validate
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', formValidation);

  const dateSort = document.getElementById('date-sort');
  dateSort.addEventListener('click', sortList);

  const toggleHistory = document.getElementById('history');
  toggleHistory.addEventListener('click', pastFuture);
}



// fetch data
const allTalks = [];
fetch("/search-talks")
  .then(res => res.json())
  .then(data => allTalks.push(...data))
  .then(attachEvents(allTalks));