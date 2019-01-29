"use strict";
/*


This file requires dom-helpers.js to work

1. autocomplete: search by subject, speaker, or tag
2. sort function: toggle date ascending and descending
3. history function: view past talks




To Do:
- order talks by date when switching between past and future
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












// ____________________________________
// Sort function(s)

// 1. order past talks by date on toggle
// 2. order future talks by date on toggle
// 3. make order work in history
// 4. default when switching between past and future = most recent first


// get past or future talks
const getTalkList = (arr, date, isFuture) => {
  const newArr = JSON.parse(JSON.stringify(arr));
  return isFuture ? newArr.filter(talk => new Date(talk.datetime) > date) : newArr.filter(talk => new Date(talk.datetime) < date);
}




// sort talks by timestamp
// - works with past and future talks
const sortList = e => {
  e.preventDefault();

  // button
  e.target.closest('button').classList.toggle('descending');

  // get order
  const order = document.getElementById('date-sort').classList.contains('descending');

  // __________________
  // if #history button has class past, we are in history
  const past = document.getElementById('history').classList.contains('past');

  // get past or future talks
  const talks = past ? getTalkList(allTalks, new Date(), false) : getTalkList(allTalks, new Date(), true);

  // opposite order for talks in the past
  const sorted = past ? sortDate(talks, !order) : sortDate(talks, order);

  // return html
  resultHtml(sorted);
};






// switch between past and future talks
const pastFuture = e => {
  e.preventDefault();

  // remove descending class from sort when toggling history
  document.getElementById('date-sort').classList.remove('descending');

  // button
  e.target.closest('button').classList.toggle('past');
  // if #history button has class .past, we are in history
  const past = document.getElementById('history').classList.contains('past');

  // button text
  const text = e.target.closest('a').childNodes[0];
  text.nodeValue = past ? 'Upcoming Talks' : 'Past Talks';

  // heading text
  const main = document.querySelector('.page-content .main-section:first-child');
  main.children[0].textContent = past ?  'Past Talks' : 'Upcoming Talks';

  // __________________
  // get past or future talks
  const talks = past ? getTalkList(allTalks, new Date(), false) : getTalkList(allTalks, new Date(), true);

  // switch order according to date
  const sorted = sortDate(talks, past);

  // return html
  resultHtml(sorted);
}













// Search Results
// - resultHtml is used by all 3 features
// - also used in dashboard.js
// - may want to refactor to take output element
const resultHtml = arr => {

  const outputHtml = arr
    .map(item => {
      // create html for any tags that exist
      const tags = item.languages.map(tag => tag ? `<span class="tag ${tag}">${tag}</span>` : '').join('');
      // different appearance for past talks
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

  // sort by date and past / future talks toggle
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