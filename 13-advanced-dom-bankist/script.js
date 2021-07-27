'use strict';
//Javascript DOM
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++){
//   btnsOpenModal[i].addEventListener('click', openModal);
// }

//simplified version of above
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/**
 * How DOM works behind the scenes
 */

/**
 * DOM is the API between the browser and javascript. 
 * - Allows us to make JS interact with browser
 * - We can write JS to create, modify, and delete HTML elements; set styles, classes
 *    and attributes; and listen and respond to events.
 * - DOM tree is generated from an HTML document, which can then interact with;
 * - DOM comes with lots of built in methods and properties to interact with DOM tree
 * 
 * Every single elment is represented by a Node, every node is represented by objects.
 * And these objects get special access to node methods and properties. 
 * 
 * There are different types of notes: Element, text, comment, document
 * 
 * ==Node
 *    - Nodes are treated like objects and have their own special methods
 *        - .textContent, .childNodes, .parentNode, .cloneNode ,etc
 * 
 * ==Element
 *    - Elements have their own type of node, and they come with a ton of usefull properties:
 *        - innerHTML, classList, children, parentElement, append(), remove(),
 *        - insertAdjacentHTML(), querySelector(), closest(), matches(), scrollIntoView(),
 *        - setAttribute(), etc
 * 
 *      == HTMLElement
 *        - The element node has an HTMLElement child type which has access to different
 *          HTML elements. One type for every html element that exists in html.
 *            - HTMLButtonElement, HTMLDivElement, etc
 * 
 *      Inheritance of methods and properties is passed down to their children. This means
 *      any HTMLElement will have access to .addEventListener(), .cloneNode() or .closest() 
 *      methods of it's parent.It will also get access to the node type.
 * 
 * ==Text
 *    - When elements have text in-side them. That text is represented using a text node
 * 
 * ==Comment
 *    - Comments have their own comment node
 * 
 * ==Document
 *    - This contains important methods related to the document.
 * 
 * ==EventTarget
 *    - A special node type that is the parent of both the Node type and Window Node type
 * 
 *        - This has access to methods like .addEventListener(), .removeEventListener()
 *          We never create an EventTarget type because it is abstract type.
 * 
 * ==Window
 *      - Global object, lots of methods and properties, many unrelated to DOM
 */


/**
 * Selecting, creating, and deleting elements
 */

//selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

console.log(allSections);


document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //returns an html collection rather than a node list
//the collection will automatically update if there are any changes to the buttons

console.log(document.getElementsByClassName('btn')); //will also return a live html collection

//Creating and inserting elements
const message = document.createElement('div');//it is created but not inserted into the page
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and experience';
message.innerHTML = 'We use cookies for improved functionality and experience' +
  '<button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); //first child
header.append(message); //last child

/**
 * dom elements are unique, and can only exist in one place at once.
 * Therefore we can use prepend and append methods to also move elements
 */

// header.append(message.cloneNode(true)); 
/**
 * to place the element in more than one place, we have to clone it first
 */

// header.before(message); //place it before as a sibiling
// header.after(message); //place it after as a sibling

//Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
})

/**
 * Styles attributes and classes using Javascript
 */

//Styles -- these are set inline
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.backgroundColor);//can only read inline styles

console.log(getComputedStyle(message)); //returns all the properties and values for styling this element
console.log(getComputedStyle(message).color); //we can choose what property to show
console.log(getComputedStyle(message).height);

//increase height 40px
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

//css custom properties (css variables) -- these are located in the document root (:root)
document.documentElement.style.setProperty('--color-primary', 'orangered');


//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);

//non-standard
console.log(logo.designer); //non-standard attributes will result to undefined
console.log(logo.getAttribute('designer')); //you can retrieve non-standard attributes using getAttribute
logo.setAttribute('designer', 'Javascript Designer');

console.log(logo.src);//this will return the absolute url, not the relative url set in html
console.log(logo.getAttribute('src'));//will return the relative url set in html


const link = document.querySelector('.nav__link--btn');
console.log(link.href);//returns absolute url
console.log(link.getAttribute('href')); //returns relative url


//Data Attributes
/**
 * the data attribute must be turned into camleCase
 * data-version-number --> versionNumber -- drop the data
 * 
 * data attributes are used a lot when working with UI.
 */
console.log(logo.dataset.versionNumber); //the data attribute must be 


//Classes
/**
 * classList.add()
 * classList.remove()
 * classList.toggle()
 * classList.contains()
 * 
 * they all can take more than one class name at once
 */


/**
 * Smooth Scrolling
 */

const btnScrollTo = document.querySelector('.btn--scroll-to');
const selection1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = selection1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); //get visible viewport info related to this element
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  console.log('height/width viewport: ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  selection1.scrollIntoView({ behavior: 'smooth' }); //modern method of smooth scrolling
});

/**
 * Event listeners
 */

/**
 * JS has many builtin event listeners
 * - click
 * - mouseenter
 * - mouseleave
 * - etc
 * 
 */

// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function(e) {
//   console.log('EventListener: H1');
// });

// h1.onmouseenter = function(e) { //we can also use onevent property and set functions to them
//   console.log('EventListener: H1');
// }

// const h1Notification = function(e) {
//   console.log('EventListener: H1');
//   h1.removeEventListener('mouseenter', h1Notification); //can also remove event listener
// }

// h1.addEventListener('mouseenter', h1Notification);

/**
 * Event propagation and bubbling
 */

/**
 * when an event is triggered it is first captuerd in the document
 * and goes down the node list to where the event was declared - target.
 * The event then travels back up to the document root, only its parents.
 * 
 * It goes from capturing phae to target phase and then bubbling phase 
 * (going back up to document throught its parent elements)
 * 
 * this is important because when an event happens its as if it happened to 
 * each of the parent elements. 
 * 
 * There are some events that occur only in the target phase.
 */

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);

//   //stop propagation
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//     //stop propagation
//     e.stopPropagation();
// })

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
// }, true); 

/**
 * when we set the third param of addEventListener to true the even will listen to 
 * capture events and no longer listen to bubbling events. 
 */

/**
 * Event Delegation
 */

//Page navigation
// document.querySelectorAll('.nav__link').forEach(function (e) {
//   e.addEventListener('click', function(el) {
//     el.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// })

//1. add event to common parent element
//2. determine what element originated that event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
})

/**
 * DOM Traversing
 */

// const h1 = document.querySelector('h1');

// //going downwards -- child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children); //returns a live collection that gets updated -- direct children

// h1.firstElementChild.style.color = 'orangered';
// h1.lastElementChild.style.color = 'orangered';


// //going upwards -- parents

// //direct parent
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// //going sideways -- siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);//get all siblings + itself -- collection

// [...h1.parentElement.children].forEach(function(el) {
//   if(el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// })


/**
 * Tabbed Component
 */

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {


  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if (!clicked) return; //guard clause when user doesn't click the button, but area close to it

  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //activate tab
  clicked.classList.add('operations__tab--active');

  //activate content area
  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
});


//Menu fade animation
const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', function(e) {
//   if(e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const sibling = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     sibling.forEach(el => {
//       if(el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener('mouseout', function(e) {
//   if(e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const sibling = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     sibling.forEach(el => {
//       if(el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

// const handleHover = function (e, opacity) {
//   if(e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const sibling = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     sibling.forEach(el => {
//       if(el !== link) el.style.opacity = opacity;
//     });
//     logo.style.opacity = opacity;
//   }
// }

// nav.addEventListener('mouseover', function(e){
//   handleHover(e, 0.5);
// })
// nav.addEventListener('mouseout', function(e){
//   handleHover(e, 1);
// })


/**
 * Using an event handler like this with a bind can only have one real argument, and
 * that is the event.
 * If we want more arguments we need to use the 'this' keyword; or passin arguments
 * using an array or an object for example.
 */
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

/**
 * We can use bind to solve to create a copy of the function it's called on, 
 * and it'll set the this keyword to whatever value we pass into bind.
 * 
 * Passing an "argument" into handler
 */
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


/**
 * Sticky Navigation
 */

const initialCoords = selection1.getBoundingClientRect();
console.log(initialCoords);
//Window Scroll event on mobile will be very slow
// window.addEventListener('scroll', function() {
//   console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');

// });

/**
 * Using Intersection Observer API:
 * allows us to observe changes to the way a certain target elements intersects
 * another element or the viewport.
 * 
 * 
 */

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root: null,//target it will be intersecting-- null == entire viewport
//   threshold: [0, 0.2], //percentage of intersection in which the callbacl will be called

// }
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(selection1);

const header2 = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(
  stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
}
);
headerObserver.observe(header2);


/**
 * Reveal on scroll when in viewport using Intersection Obersever API
 */

// const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //remove the observe once it's been revealed

}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


/**
 * Lazy loading images to improve page performance
 */

const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  /**
   * JS will replace the img src with the data-src; behind the scenes it will
   * load the new image and trigger a load event. We need to listen to the load
   * even and then remove the blur class once it is done loading.
   */
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

/**
 * Slider
 */


const slider = function () {



  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  // goToSlide(0);

  // slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);
  //0, 100, 200, 300

  let curSlide = 0;
  let maxSlide = slides.length;

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    // slides.forEach((s, i) => s.style.transform = `translateX(${100 * curSlide}%)`)
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  btnRight.addEventListener('click', nextSlide);
  //-100, 0, 100, 200
  btnLeft.addEventListener('click', prevSlide);


  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  })

  const dotContainer = document.querySelector('.dots');
  const craeteDots = function () {
    slides.forEach(function (__s, i) {
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`);
    })
  }
  // craeteDots();

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }
  // activateDot(0);
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  })

  //init
  const init = function () {
    goToSlide(0);
    craeteDots();
    activateDot(0);
  }

  init();
}

slider();


/**
 * More DOM events during page lifecycle
 */

//dom once html is parsed a long with all scripts -- only html and js no imgs or external resources
document.addEventListener('DOMContentLoaded', function(e) {
  console.log('HTML parsed and DOM tree built!', e);
});

//load event - when all imgs and external resources are loaded
window.addEventListener('load', function(e) {
  console.log('Page fully loaded', e);
});

//triggered before user leaves
// window.addEventListener('beforeunload', function(e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })


/**
 * Defer and Async script loading
 */

/**
 * Regular
 * ===============
 * - HEAD
 *    HTML is parsed until JS script is reached, then JS is fetched and executed but html 
 *    parsing is paused and is waiting until JS is finished. When JS is done browser will then
 *    continue parsing the rest of HTML
 * - BODY
 *    HTML is parsed and JS is found at the end of the document and it starts fetching and
 *    executing the JS script.
 * 
 * ASYNC
 * ===============
 * - HEAD
 *    HTML and JS loaded at the same time, JS fetching is happening while HTML is being parsed. 
 *    Once JS is being executed HTML parsing is paused, when it's finished executing HTML parsing 
 *    will continue again.
 * - BODY
 *    
 * DEFER
 * ===============
 * - HEAD
 *    HTML is parsed completely and JS is fetched at the same time, once HTML is done parsing. Then 
 *    JS execution begins at the end. 
 */