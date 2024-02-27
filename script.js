'use strict';

// Page navigation
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window
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

///////////////////////////////////////
// Button Scrolling
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

  //   Scrolling
  window.scrollTo(s1cords.left, s1cords.top + window.scrollY); // top is relativ to the viewpoint not the page

  window.scrollTo({
    left: s1cords.left,
    top: s1cords.top + window.scrollY,
    behavior: 'smooth',
  });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
/* Page navigation
/ Not very efficient solution:
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// event Delegation
// 1. Add event listener to common parent element
// 2. Determin what element originated the event */
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  clicked.classList.add('operations__tab--active');
  // Guard clause
  if (!clicked) return;

  // active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

/* refactored this a second time:
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});
*/

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

/* Sticky navigation
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
// solution with bad performance:
window.addEventListener('scroll', function (e) {
  console.log(window.scrollY);

  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}); */

// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   // will be called everytime the observed element is intersecting  the root-element at the treshold we define
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2], // percentage we want to have visible
// // };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
// /* selecting, creating and deleting Elements

// // selecting elements
// console.log(document.documentElement); // select the entire document
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1'); // creates a node-List
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons); // returns an HTML Collection, when the DOM is changed, it will immediatly change

// console.log(document.getElementsByClassName('btn'));

// // creating and inserting elements

// const message = document.createElement('div'); // just an object that represents a DOM ELement
// message.classList.add('cookie-message');
// // message.textContent =
// //   'We use cookies for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // to read or set content

// header.prepend(message); // adds the element as the first child to the header
// // header.append(message); // adds the element as the last child, when we use it here it moves the element as the last child

// // header.append(message.cloneNode(true)); // true: all the child elements will be copied too
// header.append(message);
// // header.before(message); // copies the element before it
// // header.after(message); // copies the element

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     console.log('halo');
//     message.remove();
//   });

// // Styles

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%'; // set as inline styles

// console.log(message.style.height); // won't work
// console.log(message.style.backgroundColor); // -> rgb(55, 56, 61)
// console.log(getComputedStyle(message).color); // -> rgb(172, 167, 160)
// console.log(getComputedStyle(message).height); // -> 48.8889px

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // atributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); // -> Bankist logo
// console.log(logo.src); // -> http://127.0.0.1:8080/img/logo.png it shows us the abolute URL of the element
// console.log(logo.className); // -> nav__logo

// logo.alt = 'Beautiful minimalist logo';

// // console.log(logo.designer); // doesn't work because it's not a standard property of pictures
// // but we can do this instead:
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src); // absolute URL
// console.log(logo.getAttribute('src')); // URL in the html folder

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber); //Camelcase here even if HTML is with dashes

// // classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // Don't use!! because
// // logo.className = 'jonas'

// */

// // Smooth scrolling:
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1cords = section1.getBoundingClientRect(); // shows us the coordinates of the element
//   // console.log(s1cords);
//   // console.log(e.target.getBoundingClientRect()); // shows us the coordinates of the btnScrollTo Element relatviv -> changes when we scroll
//   // console.log('Currents scroll (X/Y)', window.scrollX, window.scrollY); // -> Currents scroll (X/Y) 0 603
//   // console.log(
//   //   'height/width viewport',
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth
//   // ); // -> height/width viewport 906 886

//   // Scorlling
//   // window.scrollTo(s1cords.left, s1cords.top + window.scrollY); // top is relativ to the viewpoint not the page

//   // window.scrollTo({
//   //   left: s1cords.left,
//   //   top: s1cords.top + window.scrollY,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// // Types of Events and Event Handlers

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // h1.onmouseenter = function (e) { // a bit oldscool
// //   alert('onmouseenter: Great! You are reading the heading :D');
// // };

// // rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINK');
//   this.style.backgroundColor = randomColor(); //this in eventhandlers link to the element it is attached to (so the .nav--link in this case)
//   console.log('LINK', e.target, e.currentTarget); // e.target === the element the handler is attached to, e.currentTarget === this-Keyword
//   console.log(e.currentTarget === this); // -> true

//   // stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });
/* DOM Traversing

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // selects all child elements with the class highlight
console.log(h1.childNodes);
console.log(h1.children); // works only for direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// get all the siblings:
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
