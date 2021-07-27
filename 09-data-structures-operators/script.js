'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  // orderDelivery: function(obj) { //no destructing
  //   console.log(obj);
  // }
  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) { //immediate destruturing
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and
      ${this.mainMenu[mainIndex]} will be delivered to 
      ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient, otherIngredient);
  }
};


/**
 * destructuring is the process of taking more complex data structures
 * and breaking it down to smaller simpler ones. For example breaking down 
 * an array data structure into variables.
 */


const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

console.log(a, b, c);

//const [x,y,z] is not an array, it is the destructuring assignment.
const [x, y, z] = arr;// similar to above, creates variables x,y,z and sets values to index of arr
console.log(x, y, z);

let [main, secondary] = restaurant.categories; //it will take the first two 
// const [main, , secondary] = restaurant.categories;//the empty , , will skip index 2
console.log(main, secondary);


// //Swapping the main, and secondary 
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main]; // easier way of swapping using destructuring
console.log(main, secondary);

/**
 * we can also have a function return an array and immediately destruct the results
 * into different variables.
 */


console.log(restaurant.order(2, 0));
//we can destruct the above function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//nested destructuring
const nested = [2, 3, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

const [i, , [j, k]] = nested;
console.log(i, j, k);

//default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);


/**
 * Destructuring Objects
 */

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
//with custom names
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);


/**
 * providing default values,and custom names.
 * default values are good when the property doesn't exists
 */
const { menu = [], starterMenu: starters = [] } = restaurant;

//mutating variables
let e = 1111;
let f = 9999;
const obj = { e: 1111, f: 9999, g: 5555 };

/**
 * let {e,f} = obj; -- this is wrong syntax because e, f, is already declared
 * {e,f} = obj; -- this is also wrong because in javascript it thinks the left hand side 
 * is an object.
 * 
 * to mutate variables that already exists and destruct an object we can wrap it in 
 * paranthesis
 */
({ e, f } = obj);
console.log(e, f);

//nested objects
const { fri: { open, close } } = openingHours;
console.log(open, close);


//calling orderDelivery function and passing it an object as argument
restaurant.orderDelivery({
  time: '22:30',
  address: 'Example st N',
  mainIndex: 2,
  starterIndex: 2
});


restaurant.orderDelivery({
  address: 'Example st S',
  starterIndex: 3
});


/**
 * Spread operator:
 *    used to expand an array into all its elements. basically unpacking an 
 *    array to all elements
 * 
 *    takes all the elments out individualy and adds it to an array 
 */

const arr2 = [7, 8, 9];

const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]];
console.log(badNewArr);

const goodNewArr = [1, 2, ...arr2]; // using the ...[array name]
console.log(goodNewArr);

console.log(...goodNewArr); //logs each elements individually

const newMenu = [...restaurant.mainMenu, 'Gnocci', 'burgers']; //creating new menu and appending more items
console.log(...newMenu)


/**
 * Spread is similar to destructuring, because it help get elements out of arrays. 
 * The big difference is the spread opeartor takes all the elements from the array
 * and it also doesn't create new variables. So as a consequence, we can only use it
 * in places where you would otherwise write values separated by commas.
 */

const mainMenuCopy = [...restaurant.mainMenu]; //shallow copy of array

const menu3 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu3);

/**
 * Spread operators works on all iterables. Javascript has different iterables,
 * like arrays, strings, maps, sets, but NOT objects
 */

const myString = 'Javascript is fun';
const letters = [...myString];
console.log(letters);


// const ingrediants = [
//   prompt('Let\'s make pasta. Ingrediant 1?'),
//   prompt('Let\'s make pasta. Ingrediant 2?'),
//   prompt('Let\'s make pasta. Ingrediant 3?')
// ];

// console.log(ingrediants);
// restaurant.orderPasta(ingrediants[0], ingrediants[1], ingrediants[2]);
// restaurant.orderPasta(...ingrediants); //same results as above

//Objects
const newRestaurant = { ...restaurant, founder: 'Gordan Ramsey', foundedIn: 1936 };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Frankies Restaurant';

console.log(restaurantCopy.name);
console.log(restaurant.name);

/**
 * Rest Pattern and Parameters
 *    It has the same syntax as the spread operator but does the exact 
 *    opposite 
 * 
 *    you can use the spread operator to build new arrays or to pass multiple
 *    values to a function. The rest pattern collects multiple elements and 
 *    condenses them into an array.
 */

//DESTRUCTURING

//spread -- ... on the right hand side =
const arr3 = [1, 2, ...[3, 4]]; // [1,2,3,4]
console.log(arr3);
//REST bescause on left side of =
const [j2, k2, ...other] = [1, 2, 3, 4, 5]; // [1,2,[3,4,5]]
console.log(j2, k2, other);

/**
 * The REST pattern will collect the remaining elements unused and 
 * put them into a new array. 
 * The rest element must be the last element, and there can only be one
 * rest element in the destructuring assignment.
 * but it does not include any skipped elements. 
 */

const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(pizza, risotto, otherFood);


//objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// FUNCTIONS

/**
 * When calling this function, we don't have to define the number of arguments it
 * will accept. Instead it's better to use REST parameters. Collects all the parameters
 * and packs them all into one single array. 
 */
const add = function (...numbers) {
  // console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
}

add(2, 3);
add(5, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const u = [23, 5, 7];
add(...u);


restaurant.orderPizza(
  'mushrooms',
  'onions',
  'tomato',
  'jalapeno'
);

restaurant.orderPizza('Mushrooms');

/**
 * Spread syntax and Rest syntax look exactly the same. But they work in opposite
 * ways depending on where they are used. Spread operator is used where you would
 * write values separated by comma; and the Rest operator is used where you would 
 * write variable names separated by commas. 
 * 
 */

/**
 * #########################################
 *       Short Circuiting (&& and ||)
 * #########################################
 */

/**
 * They can use any data type and return any data type.
 * They also do short circuit evaluation.
 * 
 * || -- if the first value is truthy it will simply return that value
 *        it simply checks for the first truthy value and returns that. 
 * 
 * && -- works exact opposite way of || operator, this short circuits immediately
 *      if the first value is false.
 */
console.log(3 || 'Mark');
console.log('' || 'John');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);


//ternary to check if numGuests exists if not set it to 10
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

//a simpler approach 
const guest2 = restaurant.numGuests || 15;
console.log(guest2);

console.log('----------AND----------');
console.log(0 && 'Contoso');
console.log(7 && 'Hulk');
console.log('Hello' && 23 && null && 'Captain');


//practical -- checking if something exists and then executing it
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

//simpler approach
/**
 * && will check the first part, if it's truthy it will execute the second part.
 * It will stop evaluation when it sees the first false value.
 */
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');


/**
 * #########################################
 *       Null Coalescing Operator
 * #########################################
 */

/**
 * ?? --- works similar to || operator. This operator works with 
 *      nullish values (null, undefined) everything else is truthy.
 */


restaurant.numGuests = 0;
// const guest3 = restaurant.numGuests ? restaurant.numGuests : 10;//using this will result in 10, because 0 if falsey
const guest3 = restaurant.numGuests ?? 10;
console.log(guest3);


/**
 * #########################################
 *          Football betting
 * #########################################
 */

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//destructure players property into variables
const [players1, players2] = game.players;
console.log(players1, players2);


// use REST and destructuring 
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);


//one array with all players
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//copy players1 and add new players to it
const players1Final = [...players1, 'Thiago', 'Coutinjo', 'Periscic'];

//
const { odds: { team1, x: draw, team2 } } = game;
console.log(team1, draw, team2);

//
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
}

printGoals('Davis', 'Jordan', 'Muller', 'Carter');
printGoals('Davis', 'Ronaldo');
printGoals(...game.scored);

//which team is more likely to win
team1 < team2 && console.log('Team 1 is more liekly to win');
team2 < team1 && console.log('Team 2 is more liekly to win');


/**
 * #########################################
 *          For-of Loop
 * #########################################
 */


//create an array
const menu5 = [...restaurant.starterMenu, ...restaurant.mainMenu];
/**
 * similar to for each loop. It will loop through every item of the array
 * specified (menu5) and for element of the array it will execute it. The item
 * variable is the current elment in the iteration.
 * 
 * In For-on loop you can still use break, and continue keyword. 
 */
for (const item of menu5) console.log(item);

//if you also want the current index, and not just the current element
for (const item of menu5.entries()) {
  console.log(item);
  console.log(`${item[0] + 1}: ${item[1]}`);
}
//you can sue the entries method which will return an array of size 2; index, and value


//we can clean up the above for loop using destructuring
/**
 * we can destructure the item variable in the loop and provide the index and value
 * its own variable
 */
for (const [i, el] of menu5.entries()) {
  console.log(`${i + 1}: ${el}`);
}

/**
 * #########################################
 *         Enhanced Object Lietrals
 * #########################################
 */

/**
 * the restaurant object is an object literal because it's objects been written in code
 * using basic syntax.
 * 
 * in ES6 there are three new enhanced way to creating object literarls.
 * 
 * - If there is an object outside the object; you can include it simply by using it's name
 * - in ES6 when writing methods, we no longer have to create a property and then set it to a 
 *    function expression. 
 * - The third enhancement is, we can now compute property names, instead of writing them out 
 *    manually.
 */




const movies = {
  super: 'Batman',
  funny: 'The other guys',
  mafia: 'The Godfather'
}

const weekDays = ['mon', 'tues', 'wed', 'thur', 'fri', 'sat', 'sun'];

const mainObject = {
  name: 'I am main',
  movies, //we can simply use the object name and it will add the movies object into this
  outPutName() {
    console.log('I am the main object, coming from method');
  }, //we don't need a property name when creating this method
  [weekDays[0]]: 1, //we can compute it using any string
  [`day-${weekDays[1]}`]: 2 //we can also use literarls to compute more complex names
}
mainObject.outPutName();
console.log(mainObject);

/**
 * #########################################
 *         Optional Chaining
 * #########################################
 */

/**
 * optional chaining, if a certain property does not exists, then it return udnefined
 * immediately.
 */
// console.log(restaurant.openingHours.mon.open);//this is undefined, because mon property doesnt exist

//one of way of solving above, check if mon exists and then call open.
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);


//With optional chaining
console.log(restaurant.openingHours.mon?.open);//only if mon exists then call open property
console.log(restaurant.openingHours?.mon?.open);//can also use it for more than one property


/**
 * loop through the array of days and check if retaurant is open on that day. Use optional
 * chaining to check if property exists and print output
 */
const days = ['mon', 'tues', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

//METHOD -- opetional chaining also works on methods
//before calling the method we can optional chain to see if it exists
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderBurger?.(0, 1) ?? 'Method does not exist');

//Arrays -- optional chaining 
const users2 = [
  { name: 'John', email: 'example@email.com' }
];
//only if the user array element exists take it's name-- so if user 0 exists take its name
console.log(users2[0]?.name ?? 'User array does not exist');


/**
 * #########################################
 *  Looping Objects: keys, values, entries
 * #########################################
 */

/**
 * we have some options when looping through objects: 
 *  - we can loop through the property names,
 *  - loop through the values,
 *  - or loop through both together
 */

//OBJECT PROPERTIES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}

console.log(openStr);

//OBJECT VALUES
const values = Object.values(openingHours);
console.log(values);


//Entries - Values and Properties
const entries = Object.entries(openingHours);
console.log(entries);

/**
 * we can destructure the key value pair using [key, value]
 * and if the value is another object we can further destructure
 * that like we did here into it's properties like open and close
 * 
 */
for (const [key, { open, close }] of entries) {
  console.log(x);
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}



for (const [i, pl] of game.scored.entries()) {
  console.log(`${i + 1}. ${pl}`);
}
let avg = 0;
let count;
for (const val of Object.entries(game.odds)) {
  avg += val[1];
  count = val.length;
}
console.log(avg / (count + 1));

for (const [i, j] of Object.entries(game.odds)) {
  console.log(`Odd of : ${j}`);
}

//print out goals
for (const [i, pl] of game.scored.entries()) {
  console.log(`Goal ${i + 1}. ${pl}`);
}

//calculate avg odd
const odds = Object.values(game.odds);
let average = 0;
for (const odd of Object.values(game.odds)) {
  average += odd;
}
average /= odds.length;
console.log(average);

//Print content of object to console
for (const [team, odd] of Object.entries(game.odds)) {
  /**
   * if team = 'x' <-- odd == draw
   */
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  // console.log(team, odd);
  console.log(`Odd of ${teamStr} ${odd}:`);
}

//count player goals
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

console.log(scorers);

/**
 * #########################################
 *                  SETS
 * #########################################
 */

/**
 * Sets and Maps were introduced in ES6
 * Set is basically a collection of unique values, no duplicates. 
 *    sets are similar to arrays, no key value pairs; rather a series
 * of values grouped together into a set. Just like arrays Sets are also
 * iterables. Some difference is; the elements are all unique, and the order
 * in a Set is not relevant. 
 */

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Risotto',
  'Pizza',
  'Pizza'
]);//duplicates are removed
console.log(ordersSet);
console.log(new Set('John Doe'));
console.log(ordersSet.size);//length is used in arrays
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Burgers'));

ordersSet.add('Garlic Bread');
ordersSet.delete('Pasta');
console.log(ordersSet);
// ordersSet.clear()//will delete all the values
for (const order of ordersSet)
  console.log(order);

//Main use case of Sets is to remove duplicate values of arrays

const staff = [
  'waiter',
  'chef',
  'manager',
  'cashier',
  'waiter',
  'waiter'
];

// const staffUnique = new Set(staff);
const staffUnique = [...new Set(staff)]; //if we want to create a unique array using sets
console.log(staffUnique);

/**
 * #########################################
 *                  Maps
 * #########################################
 */

/**
 * Maps are data structures to map values to keys. 
 */

const rest = new Map();
rest.set('name', 'Classic Italian Restaurant');
rest.set(1, 'FFlorence, Italy');
rest.set(2, 'Lisbon, Portugal'); //set method updates the map and returns it as well
console.log(rest.set(3, 'London, Engale'));

//since it returns the updated map, we can chain methods
rest.set('categories', ['Italian', 'Pizzeria', 'Vegearian', 'Organic'])
  .set('open', 12)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are close');

console.log(rest);
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(3));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); //can add logic to get method

console.log(rest.has('categories'));
rest.delete(2); //delete key value pair from map
console.log(rest);
console.log(rest.size);
// rest.clear(); //remove all key value pairs from map
// console.log(rest);

//wrong way
// rest.set([1,2], 'Test');
// console.log(rest.get([1,2]));

//right way to add array to map
const arr4 = [1, 2]; //create an array variable
rest.set(arr4, 'Testing');//pass the variable to map
console.log(rest.get(arr4));

rest.set(document.querySelector('h1'), 'Heading'); //can also be used to hold DOM elements
console.log(rest);



//MAPS ITERATION
const question = new Map([
  ['question', 'Best programming language'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'C++'],
  [4, 'Javascript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);

console.log(question);
console.log(Object.entries(openingHours));//Convert object to map
//Converting object entries into map key value pairs
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Option ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer: '));
// console.log(answer);
// if(answer === 3) console.log(question.get(true));

// console.log(question.get(question.get('correct') === answer)); // better because not hard coded

//Convert map to array
console.log([...question]);
console.log(question.entries());
console.log(question.values());
console.log(question.keys());
console.log([...question.keys()]);
console.log([...question.values()]);

/**
 * Choosing between data structures:
 * 
 * Sources of Data:
 *    - From program itself: Data written directly in source code (e.g. status message)
 *    - From the UI: Data input from the user or data written in DOM (e.g tasks in to do app)
 *    - From external sources: Data fetched for example from Web API
 * 
 * The source of data is all a collection of data which can be stored in a data structure.
 * To decide which structure to use, things to consider:
 * 
 * - just need a simple list of values --> Arrays or Sets
 * - need key value pairs --> Object or Map. Keys allow to describe the value
 * 
 * Arrays vs Sets:
 * arrays --> need order, and duplicate are okay, manipulate data
 * sets --> need unique values, performance is important , and remove duplicates
 * 
 * Objects vs Maps:
 * objects --> traditional key/value sotre, easier to write and access values with . and []
 *            when need to include functions, when working with JSON(can convert to map)
 * maps --> better performance, keys can have any data type, easy to iterate, easy to compute size,
 *          when simply need to map key to values, when you need keys that are not strings
 * 
 */


/**
 * 
 */


const gameEvents = new Map([
  [17, 'GOAL'],
  [36, 'Substitution'],
  [47, 'GOAL'],
  [61, 'Substitution'],
  [64, 'Yellow card'],
  [69, 'Red card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, 'GOAL'],
  [80, 'GOAL'],
  [92, 'Yellow card'],
]);

console.log(gameEvents.values());

//remove duplicates, only keep unique events in the game
const events = [...new Set(gameEvents.values())];
console.log(events);

//delete event from 64
gameEvents.delete(64);

//print average rate of eevent
const time2 = [...gameEvents.keys()].pop();
console.log(time2);
console.log(
  `An event happened, on average, every ${time2 / gameEvents.size} minutes`
);

//loop through the map
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}


/**
 * #########################################
 *                 Strings
 * #########################################
 */

/**
 * strings have a lot of methods similar to arrays
 * strings are not mutable, they are primitive. When we change the value of a string
 * it is actually being placed in a different memory location.
 */

const airline = 'TAP Air Canada';
const plane = 'A320';

console.log(plane[0]);
console.log('B737'[2]);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('d'));
console.log(airline.indexOf('Air')); //it is case sensitive


console.log(airline.slice(3)); //position at which the extraction will start, slice returns a new string
console.log(airline.slice(3, 8));//you can also include the end parameter

/**
 * we can get the first and last word, simply by check the index of the first and last
 * occurance of an empty space ' ' 
 */
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));


console.log(airline.slice(-4)); //negative will count from the end
console.log(airline.slice(1, -3));

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat');
  } else {
    console.log('You got lucky');
  }
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

/**
 * whenever we call a method on a string javascript will automatically convert
 * that string primitive into a string object behind the scene, with the same content.
 * And then the method is called on that object. This process is called boxing. 
 * 
 * It basically takes the string and puts it into a box which is the object.
 * When the method is finised, the object is converted back to a primitive string.
 * All string methods return a string primitive even if they are call on a string 
 * object. 
 * 
 */

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

const passenger = 'tiMotHy';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//comparing email
const email = 'hello@gmail.com';
const loginEmail = '       HelLO@GmAiL.coM  \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);
//same as above
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);


//replacing parts of string
const priceGB = '288,56E';
const priceUS = priceGB.replace('E', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers please come to boarding door 23. Boarding door 23';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));

//if replaceAll doesn't work, you can use regular expression to replace all occurrance
console.log(announcement.replace(/door/g, 'gate'));

//Booleans
const plane2 = 'A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('Boeing'));
console.log(plane2.startsWith('A32'));

if (plane2.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

console.log('a+very+nice+string'.split('+'));
console.log('The Johnsons'.split(' '));
const [fName, lName] = 'El Tuco'.split(' ');

const newName = ['Mr.', fName, lName.toUpperCase()].join(' '); //one entire string composed of the everything
console.log(newName);

const passenger3 = 'Jessica aNn sMith DaVIs';
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(' '));
}

capitalizeName(passenger3);
capitalizeName('Rambo Stallone');


//Padding 
const msg = 'Go to gate 23';
console.log(msg.padStart(25, '+')); //prepends + to the beginning until the string is 25 characters long
console.log(msg.padEnd(30));
console.log(msg.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
}

console.log(maskCreditCard(433784658165846));
console.log(maskCreditCard('645812569486543156'));

//Repeat
const message3 = 'Bad weather... All departures delayed...';
console.log(message3.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line`);
}

planesInLine(5);
planesInLine(3);



/**
 * Practice
 */

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {

  const text = document.querySelector('textarea').value;
  // console.log(text);
  const rows = text.split('\n');
  // console.log(rows);

  for (const [i, row] of rows.entries()) {

    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;

    console.log(`${output.padEnd(20)} ${'*'.repeat(i + 1)}`);
  }
});



/**
 * Another Practice
 */


const flights2 =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+"+
  "_Arrival;bru0943384722;fao93766109;11:45+"+
  "_Delayed_Arrival;hel7439299980;fao93766109;12:05+"+
  "_Departure;fao93766109;lis2323639855;12:30";

  console.log(flights2.split('+'));

  const getCode = str => str.slice(0,3).toUpperCase();
  for(const fl of flights2.split('+')) {
    // console.log(fl.split(';'));
    const [type, from, to, time] = fl.split(';');
    const output = `${type.startsWith('_Delayed') ? '**': '++'}${type.replaceAll('_', '')} 
    ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`;
    console.log(output);
  }

