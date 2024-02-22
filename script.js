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

/* selecting, creating and deleting Elements

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

// Styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%'; // set as inline styles

console.log(message.style.height); // won't work
console.log(message.style.backgroundColor); // -> rgb(55, 56, 61)
console.log(getComputedStyle(message).color); // -> rgb(172, 167, 160)
console.log(getComputedStyle(message).height); // -> 48.8889px

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// atributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // -> Bankist logo
console.log(logo.src); // -> http://127.0.0.1:8080/img/logo.png it shows us the abolute URL of the element
console.log(logo.className); // -> nav__logo

logo.alt = 'Beautiful minimalist logo';

// console.log(logo.designer); // doesn't work because it's not a standard property of pictures
// but we can do this instead:
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // absolute URL
console.log(logo.getAttribute('src')); // URL in the html folder

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber); //Camelcase here even if HTML is with dashes

// classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use!! because
// logo.className = 'jonas'

*/
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect(); // shows us the coordinates of the element
  console.log(s1cords);
  console.log(e.target.getBoundingClientRect()); // shows us the coordinates of the btnScrollTo Element relatviv -> changes when we scroll
  console.log('Currents scroll (X/Y)', window.scrollX, window.scrollY); // -> Currents scroll (X/Y) 0 603
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // -> height/width viewport 906 886

  // Scorlling
  // window.scrollTo(s1cords.left, s1cords.top + window.scrollY); // top is relativ to the viewpoint not the page

  window.scrollTo({
    left: s1cords.left,
    top: s1cords.top + window.scrollY,
    behavior: 'smooth',
  });

  section1.scrollIntoView({ behavior: 'smooth' });
});
