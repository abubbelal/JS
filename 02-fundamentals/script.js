"use strict";

/**
 * strict mode in javascript helps us write more secure javascript code.
 * By secure: it makes it easier to avoid accidental errors.
 * strict mode must be declared at top of the page.
 *
 * - it forbids us from doing certain things.
 * - it will create visible errors for us in certain situations
 */
let hasDriversLicense = false;
const passTest = true;

//strict mode lets you know when you make errors like this in variables
// if(passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log("You can drive!");

/**
 * ###############################
 *            Functions
 * ###############################
 */

/**
 * function [name of function]([function arguments]) {
 *    [code to execute]
 * }
 */

function logger() {
  console.log('Log from logger');
}

logger(); //invoking, calling, or running the function. all mean the same thing
logger();

//function can also return data back for us to use
//return back a string from this function
function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}

console.log(fruitProcessor(4, 5));
const appleJuice = fruitProcessor(4, 0);
console.log(appleJuice);


function describeCountry(country, population, capitalCity) {
  return `\n\ ${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const descPortugal = describeCountry("Portugal", 10, "Lisbon");
const descGermany = describeCountry("Germany", 83, "Berlin");
const descFinland = describeCountry("Finland", 6, "Helsinki");
console.log(descPortugal, descGermany, descFinland);

/**
 * ###############################
 * Function Declaration and Expression
 * ###############################
 */

/**
 * There are different ways to create a function in javascript:
 * 
 * - function declaration
 *        function [name of function] (arguments) { }
 * - function expression
 *        let/var/const [variable name] = function([arguments]){ }
 * - arrow function
 *        a simpler shorter version of function expression
 */

//function declaration
function calcAge1(birthYear) {
    // const age = 2037 - birthYear;
    // return age;
    return 2037 - birthYear;
}

const age1 = calcAge1(1955);
const age2 = calcAge1(1852);


// function expressions 
/**
 * we create an anonymous function (function without a name) 
 * and assign that to a variable: let, var, const. 
 * 
 * These functions produce a value, and we store that value in
 * the variable. These functions are expressions. 
 */
const calcAge2 = function(birthYear) {
  return 2055 - birthYear;
}

const age3 = calcAge2(1663);
const age4 = calcAge2(1936);

console.log(age1, age2, age3, age4);

function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

const percPortual1 = percentageOfWorld1(10);
const percChina1 = percentageOfWorld1(1441);
const percUSA1 = percentageOfWorld1(332);
console.log(percPortual1, percChina1, percUSA1);

/**
 * A big difference between function declaration and function expression
 * is that we can call function declarations before they are defined in
 * the code, while function expressions can only be called after it's 
 * been defined. 
 * 
 * This is due to javascript hoisting. 
 */

/**
 * ###############################
 *          Arrow Functions
 * ###############################
 */

/**
 * arrow functions are basically function expressions, but shorter and simpler.
 * The return is implied, without us explitly writing it. A big difference for
 * arrow functions is, they don't get 'this' keyword. 
 */

//arrow function can be short like if its just a one line function
const calcAge3 = (birthYear) => 2037 - birthYear;
console.log(calcAge3(2003), calcAge3(1982),calcAge3(1978));

//it can also perform multi line execution
const yearsToRetire = (birthYear) => {
  const age = 2055 - birthYear;
  const retirement = 65 - age;
  return retirement;
}

console.log(yearsToRetire(1966));

const percentageOfWorld3 = (population) => (population / 7900) * 100;
const percPortugal3 = percentageOfWorld3(10);
const percChina3 = percentageOfWorld3(1441);
const percUSA3 = percentageOfWorld3(332);
console.log(percPortugal3, percChina3, percUSA3);

const describePopulation = function (country, population) {
  const percentage = percentageOfWorld1(population);
  const description = `${country} has ${population} million
  people, which is about ${percentage}% of the world.`;
  console.log(description);
};
describePopulation("Portugal", 10);
describePopulation("China", 1441);
describePopulation("USA", 332);


const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(5,3,9));

//Test1
const scoreDolphins = calcAverage(44,23,71);
const scoreKoalas = calcAverage(65,54,49);

console.log(scoreDolphins, scoreKoalas);

const checkWinner = function (avgDolphins, avgKoalas) {
  if(avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win: ${avgDolphins} vs ${avgKoalas}`);
  } else if(avgKoalas >= 2 * avgDolphins){
    console.log(`Koalas win: ${avgKoalas} vs ${avgDolphins}`);
  } else {
    console.log(`No one wins.`);
  }
}

checkWinner(scoreDolphins, scoreKoalas);
checkWinner(444, 125);

/**
 * ###############################
 *            Arrays
 * ###############################
 */

/**
 * A simple data structure in javascript is arrays
 * the other is objects
 */

const friends = [
  'John',
  'Doe',
  'Contoso'
];

console.log(friends);

const years = new Array(
  1990, 1991, 1992, 1993,1994, 1995, 1996, 1997, 1998, 1999
);

console.log(years);
console.log(years.length);

friends[2] = 'Bob'; //replace contoso with Bob
console.log(friends);

//Example of mixed data types inside the array
const person  = [
  'John', 2088 - 1945, 'Canada', 'Javascript', friends
];
console.log(person);


/**
 * built in array methods
 */

friends.push('Jay'); //push is a function that return a value == length of the new array
console.log(friends);

console.log(friends.push('New Friends')); //will return the length of the new array 

friends.unshift('First Friend'); //unshift adds an element to the beginning of the array
console.log(friends);

console.log(friends.pop()); //pop will take out the last element
//pop returns a value == the value of the element being removed
console.log(friends);

console.log(friends.shift()); //remove the first element and return its value
console.log(friends);

//indexOf will check if a value exists in the array and returns its index
console.log(friends.indexOf('Jay'));
console.log(friends.indexOf('unknown friend')); //if it's not in the array, returns -1

//includes will check if it's in the array and simply return true or false
console.log(friends.includes('Doe'));
/**
 * it does strict equality check (===) so there is no type coercion
 * if array has 23 and you search for '23' it will return false
 */

let populations = [10, 1441, 332, 83];
console.log(populations.length === 4);
const percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3]),
];
console.log(percentages);

const neighbours = ["Norway", "Sweden", "Russia"];
neighbours.push("Utopia");
console.log(neighbours);
neighbours.pop();
console.log(neighbours);
if (!neighbours.includes("Germany")) {
  console.log("Probably not a central European country :D");
}
neighbours[neighbours.indexOf("Sweden")] = "Republic of Sweden";
console.log(neighbours);

const calcTip = function(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const bills = [125, 555, 441];
const tip = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log(bills, tip);

/**
 * ###############################
 *           Objects
 * ###############################
 */
/**
 * key value pairs
 * Each of these keys is a property, and we can assign other data types/structures
 * as the value of the keys.
 * 
 * in arrays the order matters a lot, while in objects the order does not matter
 */
const Person = {
  firstName: 'John',
  lastName: 'Doe',
  company: 'Contoso',
  job: 'Developer',
  friends: friends
};

Person.hasDriversLicense = false; //add new property to the object
console.log(Person);

/**
 * ###############################
 *          Dot vs Bracket
 * ###############################
 */

console.log(
  Person
);

/**
 * a big difference between the dot and bracket notation is that 
 * in bracket notation you can also include expressions that return a value
 */
console.log(Person.lastName);
console.log(Person['firstName']);

Person.firstName = 'Carl';
console.log(Person);

console.log(`${Person.firstName} has ${Person.friends.length} friends, and his 
best friend is called ${Person.friends[0]}`);


/**
 * ###############################
 *          Object Methods
 * ###############################
 */

/**
 * objects can hold different types of data, objects, as well as functions
 * 
 * this keyword is equal to the object on which the method is called
 */

const Person2 = {
  firstName: 'John',
  lastName: 'Doe',
  company: 'Contoso',
  job: 'Developer',
  friends: friends,
  birthYear: 1111,
  hasDriversLicense: true,
  calcAge: function(birthYear) {
    return 2088 - birthYear;
  },
  calcAge2: function() {
    return 5555 - this.birthYear;
  },
  calcAge3: function() {
    this.age = 2099 - this.birthYear; //create new property for this object
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} is a ${this.job} at ${this.company} and has ${this.friends.length} friends.
    He is also ${this.age} years old
    He has ${this.hasDriversLicense ? 'a' : 'no'} driver's license`;
  }
}

console.log(Person2.calcAge(1591));
console.log(Person2.calcAge3());
console.log(Person2.age); //only available if the function is executed
console.log(Person2.getSummary());



const myCountry2 = {
  country: "Canada",
  capital: "Ottawa",
  language: "English",
  population: 36,
  neighbours: ["USA", "Mexico", "Canada"],
  describe: function () {
    console.log(
      `${this.country} has ${this.population} million
  ${this.language}-speaking people,
  ${this.neighbours.length} neighbouring countries and a
  capital called ${this.capital}.`
    );
  },
  checkIsland: function () {
    this.isIsland = this.neighbours.length === 0 ? true : false;
    // Even simpler version
    // this.isIsland = !Boolean(this.neighbours.length);
  },
};
myCountry2.describe();
myCountry2.checkIsland();
console.log(myCountry2);

const markOb = {
  firstName: 'Mark',
  lastName: 'Miller',
  mass: 90,
  height: 1.75,
  calcBMI: function() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  }
}

const johnObj = {
  firstName: 'John',
  lastName: 'Smith',
  mass: 50,
  height: 1.58,
  calcBMI: function() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  }
}
markOb.calcBMI();
johnObj.calcBMI();

console.log(markOb.bmi, johnObj.bmi);

if(markOb.bmi > johnObj.bmi) {
  console.log(`${markOb.firstName}'s BMI (${markOb.bmi}) is higher than ${johnObj.firstName}'s BMI
  (${johnObj.bmi})`);
}

console.log(markOb.calcBMI() > johnObj.calcBMI() ? 'Mark has higher BMI' : 'John has higher BMI');

/**
 * ###############################
 *         Iteration
 * ###############################
 */
const types = [];

for(let rep = 1; rep  <= 10; rep++) {
  console.log('Repetition number: ' + rep);
}

for (let voter = 1; voter <= 50; voter++)
  console.log(`Voter number ${voter} is currently voting`);

// looping through object keys
for (let i = 0; i < person.length ; i++ ){
  //reading from person array
  console.log(person[i], typeof person[i]);
  //filling types array
  // types[i] = typeof person[i]
  types.push(typeof person[i]);
}

console.log(types);


/**
 * ###############################
 *         Looping
 * ###############################
 */



populations = [10, 1441, 332, 83];
const percentages2 = [];
for (let i = 0; i < populations.length; i++) {
  const perc = percentageOfWorld1(populations[i]);
  percentages2.push(perc);
}
console.log(percentages2);

const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];
for (let i = 0; i < listOfNeighbours.length; i++)
  for (let y = 0; y < listOfNeighbours[i].length; y++)
    console.log(`Neighbour: ${listOfNeighbours[i][y]}`);

const percentages3 = [];
let i = 0;
while (i < populations.length) {
  const perc = percentageOfWorld1(populations[i]);
  percentages3.push(perc);
  i++;
}
console.log(percentages3);

for(let i = years.length; i >= 0; i--) {
  console.log(`Current Year: ${years[i]}`);
}

let counter = 0;
while(counter < years.length) {
  console.log(`Year is: ${years[counter]}`);
  counter++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while(dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if(dice === 6)
    console.log("Loop is about to end");
}

/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate 
tips and total values (bill + tip) for every bill value in the bills array. 
Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 😉

4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array

GOOD LUCK 😀
*/
const bills2 = [
  22, 295, 176, 440, 37, 105, 10, 1100, 86, 52
];

const tips = [];
const totals = [];

for(let i = 0; i < bills2.length; i++) {
  const tip = calcTip(bills2[i]);
  tips.push(tip);
  totals.push(tip + bills2[i]);
}

console.log(bills2, tips, totals);
const calcAverage2 = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // sum = sum + arr[i];
    sum += arr[i];
  }
  return sum / arr.length;
}
console.log(calcAverage2([2, 3, 7]));
console.log(calcAverage2(totals));
console.log(calcAverage2(tips));
