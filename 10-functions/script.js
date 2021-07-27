'use strict';


/**
 * ###############################
 *        Default Parameters
 * ###############################
 */

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 150 * numPassengers) {
    //old way of setting default values
    // numPassengers = numPassengers || 1;
    // price = price || 199;

    const booking = {
        flightNum,
        numPassengers,
        price
    }

    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2);
createBooking('AMS123', undefined, 175);
createBooking('MK123', 3);

/**
 * ###############################
 *   Passing value vs Reference
 * ###############################
 */

const flight = 'LH1234';
const bob = {
    name: 'Bob Harrison',
    passport: 235468126548
}

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 235468126548) {
        console.log('Checked in');
    } else {
        console.log('Wrong passport!');
    }
};

checkIn(flight, bob);
console.log(flight); //the flight has not changed, passed by value
console.log(bob); //the name has changed, passed by reference

/**
 * flight is a string which is a primitive type, when we passed the flight to checkIn
 * it was by value. While passenger (bob) is an object which is a reference type in 
 * the Heap. We passed the memory reference to bob in the heap to the function. After
 * making changes to bob in the function it will reflect to bob outside the function. 
 */

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000000000000);
}

newPassport(bob);
checkIn(flight, bob);

/**
 * Javascript doesn't have passing by reference, only passing by value.
 * It only looks like we are passing by reference. When we are doing passing 
 * by reference in JS we are actually passing the memory address as the value.
 * 
 */

/**
 * ###############################
 * First class and Higher order function
 * ###############################
 */

/**
 * First class functions:
 *      JS treats functions as first-class citizens. Meaning functions are simply
 *      values, functions are just another "Type" of object. Since functions are 
 *      just values, we can store them in variables, properties, etc. We can also
 *      pass functions as arguments to OTHER functions. Can also return functions 
 *      FROM other functions.
 * 
 *      And since functions are just another "type" of objects, that means we have
 *      function dedicated methods as well. 
 * 
 * Higher Order Functions:
 *      A function that receives another function as an argument, or that returns a 
 *      new function, or both. Only possible because of first-class functions. 
 * 
 *      For example, 'addEventListener' function takes in function as a argument. 
 */


/**
 * ###############################
 * Functions Accepting callback functions
 * ###############################
 */
console.log('##########################################');
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

//Higher-Order function
const transformer = function (str, fn) {
    console.log(`Original String: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`); //.name is a function property
}

transformer('Javascript is fun', upperFirstWord);

transformer('Javascript is confusing', oneWord);

const high5 = function () {
    console.log('Hi');
}

/**
 * high5 is the call-back function the addEventListener function will call 
 * once it is executed
 */
// document.body.addEventListener('click', high5);

// ['Bob', 'Carl', 'Davis'].forEach(high5);//for each element execute the call-back high5

/**
 * Pros of call-back 
 * - It makes it easier to split up the code into easier and reusable parts
 * - Call-back functions allow us to create a level of abstraction. Enabling us to
 *      hide some level of detail.
 */

/**
 * ###############################
 * Functions returning function
 * ###############################
 */
console.log('##########################################');

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}

const greeterHey = greet("Hey");
greeterHey('Bob');
greeterHey('Mark');

/**
 * this works because greeterHey is essentially the returning function from greet.
 * the first function greet returns a new function that get's stored in the 
 * variable greeterHey with the greet parameter already filled. When we call the 
 * greeterHey function it calls out the rest.
 */

/**
 * we can also execute the entire function in one go. First call the greet function
 * and pass in the parameters for the returned function right after.
 */
greet('Hello')('Twain');


//The greet function written as an arrow function
const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2("How are you")("Laura");

/**
 * ###############################
 *      Call and apply methods
 * ###############################
 */
console.log('##########################################');

const Porter = {
    airline: 'Porter',
    iataCode: 'PA',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline}
        flight ${this.iataCode} ${flightNum}`);
        this.bookings.push({
            flight: `${this.iataCode}${flightNum}`,
            name
        })
    }
}

Porter.book(239, 'Hulk');
Porter.book(652, 'James Bond');

const AC = {
    airline: "Air Canada",
    iataCode: 'AC',
    bookings: [],
}

const Jazz = {
    airline: "Jazz Air Line",
    iataCode: 'JA',
    bookings: [],
}

const book = Porter.book; //store the function into a new variable

//Does not work, because 'this' is undefined in strict mode
//  book(23, 'James Bond');


/**
 * the call method: 
 *      allows us to define what the 'this' keyword is going to point to.
 *      the first argument is what it should point to, the other parameters
 *      are the function parameters.
 */
book.call(AC, 23, 'James Bond');
book.call(Jazz, 652, 'Lalo Salamanca');

/**
 * We can do the same using 'apply' method. 
 * Only difference is, the apply method does not receive a list of 
 * arguments after the 'this' keyword, it will take an array of arguments
 */

const flightData = [852, 'George Cooper'];
book.apply(Jazz, flightData);

// we can do the same thing with call using the spread operator 
book.call(AC, ...flightData);


/**
 * ###############################
 *      Bind Method
 * ###############################
 */
console.log('##########################################');

/**
 * Similar to call and apply method, it allows you to manually set the this 
 * keyword for a function call.
 * 
 * Bind :
 * - it does NOT immediately call the function, instead it returns a new function
 * where this keyword is bound.
 * - 
 */

const bookAC = book.bind(AC);//return a function where this keyword is always bound

bookAC(543, 'Steven Johnson');
bookAC(9875, 'Ernie Johnson');
const bookJazz = book.bind(Jazz);
bookJazz(954, 'Charles Barkley');

/**
 * Bind can be taking further, in the call back function we can pass in multiple 
 * arguments besides the this keyword. And these arguments will be set in stone. 
 * Making the function call with the same arguments.
 */

const bookAC23 = book.bind(AC, 23); //binding for flight 23 in AC
bookAC23('Shaq Oniel');
bookAC23('Kenny the JET')

/**
 * Bind method can be used well with objects and event listeners
 */

Porter.planes = 300;
Porter.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', Porter.buyPlane);
document.querySelector('.buy')
    .addEventListener('click', Porter.buyPlane.bind
        (Porter));

/**
 * Another use case is for partial applications
 * partial applications allows us to preset parameters
 */

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.10, 200));
const addVAT = addTax.bind(null, 0.23);
addVAT = value => value + value * 23;

console.log(100);
console.log(155);

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    }
}

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(200));
console.log(addVAT2(234));

/**
 * ###############################
 *          Practice
 * ###############################
 */
console.log('##########################################');

const poll = {
    question: 'What is your favourite programming language?',
    options: [
        '0: JavaScript',
        '1: Java',
        '2: Rust',
        '3: C++',
        '4: PHP'
    ],
    // This generates [0, 0, 0, 0].
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}
        \n(Write option number)`));

        console.log(answer);

        typeof answer === 'number' && answer < this.answers.length && 
            this.answers[answer]++;
        
        // console.log(this.answers);
        this.displayResults();
        this.displayResults('string');
    },
    displayResults(type = 'array') {
        if(type === 'array') {
            console.log(this.answers);
        } else if(type === 'string') {
            console.log(`Poll resutlts are ${this.answers.join(', ')}`);
        }
    },
};

document
    .querySelector('.poll')
    .addEventListener('click', poll.registerNewAnswer
    .bind(poll));

poll.displayResults.call({answers: [5,3,2]}, 'string'); //pass new object to resolve issue with this keyword

poll.displayResults.call({answers: [4,7,6]}, 'string');


/**
 * ###############################
 *  Immediate Invoked Functions
 * ###############################
 */
 console.log('##########################################');

 const runOnce = function() {
     console.log('This will only run once');
 }

 runOnce();

 //to create a function that only runs once, we simply create the function
 //and not assign it to any variable, but it has to be wrapped in


(
    function() {
        console.log('This function will run once');
    }
)();//immediately call the function

(
    () => console.log('This will ALSO only run once')
)();


/**
 * Why was this pattern invented:
 * 
 * - functions create scopes, what's important is one scope doesn't have access to
 * variables from inner scopes. Therefore all data inside a scope is private to that scope.
 * Or encapsulated inside that function scope. 
 * 
 * - variables declared with let and const create their own scope inside a block. 
 * 
 */

{
    const isPrivate = 23;
}

// console.log(isPrivate); //will not be able to access the variable

/**
 * ###############################
 *          Closures
 * ###############################
 */
 console.log('##########################################');

 /**
  * closures happen automatically in certain situations, and we have to be able to
  * recognize where and when it happens. It is not something created manually like an
  * array for example.
  */

 const secureBooking = function() {
    let passengerCount = 0;
    return function() {
        passengerCount++; 
        console.log(`${passengerCount} passengers`);
    }
 }

  /**
  * Behind the scene:
  * Before we are assigning secureBooking() to booker; the code for the function
  * is running in the Global Exeution Context (global EC) in the call stack. 
  * 
  * Once secureBooking begins being executed a new execution context is placed on top
  * and it has it's own variable environment (in this case passengercount) which contains
  * all it's local variables. 
  * 
  * Then a new function is returned and stored in the booker variable. 
  * 
  */
 const booker = secureBooking();
 /**
  * booker now holds the returned function from secureBooking.
  * when we cann booker we are actually calling secureBooking and it's returned 
  * function
  */

booker();
booker();
booker();

/**
 * the booker variable (function) simply exists in the global environment or
 * in the global scope. And the environment in which the function was created(secureBooking)
 *  is no longer active in the context, but somehow booker still has access to it's variables.
 * 
 * A closure makes a function remember all the variables that existed at the functions 
 * birthplace. So the booker returned function being assigned to booker essentially
 * remembers all variables at its birth place, including passengerCount.
 * 
 * 
 * Any function always has access to the variable environment of the execution context
 * in which the function was created. The closure is then basically this variable 
 * environment attached to the function exactly as it was at the time and place the 
 * function was created.
 * 
 */

console.dir(booker);//scopes --> closure is defined there. //double bracket is an internal property that cannot be accessed


/**
 * ###############################
 *         Move Closures
 * ###############################
 */
 console.log('##########################################');

 let f;

 const g = function() {
     const a = 23;
     f = function() {
        console.log(a * 2);
     }
 }

 const h = function () {
     const b = 777;
     f = function() {
         console.log(b * 2);
     }
 }

 //f -- assigned inside g 
 g();
 f();
console.dir(f);
 //F will be re-assigned by h
 h();
 f();

 console.dir(f);


 const boardPassengers = function(n, wait) {
     const perGroup = n / 3;

     setTimeout(function() {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
     }, 1000); //will be executed after 1s

     console.log(`Will start boarding in ${wait} seconds`);
 }

 const perGroup = 1000; //this will not effect the closure, because closures have priority
boardPassengers(180, 3);


(
    function() {
        const header = document.querySelector('h1');
        header.style.color = 'red';

        document.querySelector('body').addEventListener('click', function() {
            header.style.color = 'blue';
        })
    }
)();


