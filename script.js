'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i];

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// selecting, creating and deleting Elements
// selecting elements
console.log(document.documentElement); // select the entire document
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1'); // creates a node-List
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // returns an HTML Collection, when the DOM is changed, it will immediatly change

console.log(document.getElementsByClassName('btn'));

// creating and inserting elements

const message = document.createElement('div'); // just an object that represents a DOM ELement
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // to read or set content

header.prepend(message); // adds the element as the first child to the header
// header.append(message); // adds the element as the last child, when we use it here it moves the element as the last child

// header.append(message.cloneNode(true)); // true: all the child elements will be copied too
header.append(message);
// header.before(message); // copies the element before it
// header.after(message); // copies the element

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    console.log('halo');
    message.remove();
  });
