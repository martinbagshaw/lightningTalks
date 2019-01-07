"use strict";
/*
This file requires dom-helpers.js to work

- autocomplete: search by subject, speaker, or tag
- history button: view past talks
- sort button: sort date ascending and descending

- fetch data at the end of the file

To Do:
- grey out past talks
- get sort button working with past and future talks (integration)
*/



// ____________________________________
// Autocomplete function(s)

// - search name, username, subject, and language
const searchTalks = (word, talks) => {
  return talks.filter(talk => {
      // word = text input value
      const regex = new RegExp(word, 'gi');

      // autocomplete with languages
      // - this picks out languages from array
      // - need to add 'javascript' as an alias for 'js' somehow
      const tag = talk.languages.filter(lang => lang.match(regex)).filter(match => match !== null)[0];

      // need a bigger dataset to test this properly
      return talk.username.match(regex) || talk.name.match(regex) || talk.subject.match(regex) || tag
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
      // create html for any tags that exist
      const tags = item.languages.map(tag => tag ? `<span class="tag ${tag}">${tag}</span>` : '').join('');
      // talk passed?
      const past = new Date(item.datetime) < new Date() ? ' past' :'';
      // return html
      return `<li id="search-item-${item.id}" class="search-item${past}">${item.subject} | ${item.username} <span class="search-person">a.k.a. ${item.name}</span>
        ${tags}<span class="search-arrow">→</span>
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