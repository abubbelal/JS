// alert("Hello World");
console.log("Hello World!");
console.log(40 - 28 + 35 / 3);

// 001 JAVASCRIPT 

/**
 * Javascript is a high-level, Object-oriented, multi-paradigm programming language
 */

console.log("John");
console.log(001);

let firstname = "John";
let lastname = "Doe";

console.log(firstname + " " + lastname);

/**
 * Javascript Data Types:
 * every value is either:
 * - object
 * - primitive
 *      - the value is primitive only if it isn't an object
 * 
 * There are 7 primitive data types:
 * 1. number -- always floating point numbers --> let age = 99;
 * 2. String sequence of characters -- used for text -- let name = "John Doe"
 * 3. Boolean is a logical data type -- true or false -- let isAlive = true;
 * 4. Undefined value taken by a variable not yet defined -- empty -- let hope;
 * 5. Null Also similar to being empty
 * 6. Symbol unique value that cannot be changed
 * 7. BigInt larger integer than Number
 * 
 * Javascript has dynamic typing: meaning you don't have to manually define the data
 * type of the value stored in a variable, the data type is determined automatically
 * 
 */


//###############################################

let country = "Canada";
let continent = "North America";
let population = 37_000_000;

console.log("Country: " + country);
console.log("Continent: " + continent);
console.log("Population: " + population);

//###############################################

let isIsland = false;
let language;

console.log("Country data type: " + typeof country);
console.log("Continent data type: " + typeof continent);
console.log("Population data type: " + typeof population);
console.log("Island data type: " + typeof isIsland);
console.log("Language data type: " + typeof language);

//###############################################

/**
 * let and const were introduced in ES6, while var was there from legacy.
 * 
 * let: decalre variables that can change later. But you reassign the variable.
 *      let age = 88; <-- declare and assign the variable
 *      age = 89; <-- reassign the value
 * 
 * const: declare variables that will not change.
 *      const GENDER = "male"; <-- this will not change, and remains constant
 *      const BIRTHDAY; <-- cannot declare a const and not initialize
 * 
 * var: legacy way of declaring variables --> similar to let
 * 
 * You can also declare a variable without using any of the above. 
 *      fullname = "John Doe";
 * This is a bad idea, because this will create a property on the global object, 
 * and not on the current scope. This method breaks scope restrictions.
 */

/**
 * ###############################
 *          OPERATORS
 * ###############################
 */

/**
 * Operator      |
 * -------------------------------
 *      +        | addition
 *      -        | subtraction
 *      *        | multiplication
 *      /        | division
 *      %        | modulus
 *      ++       | increment
 *      --       | decrement
 * 
 * Assignment       |
 * -------------------------------
 *      +=          |   x = x + y
 *      *=          |   x = x * y
 *      /=          |   x = x / y
 *      -=          |   x = x - y
 *      %=          |   x = x % y
 *      x++         |   assign the value of x first and then increment 
 *      ++x         |   increment the value of x and then assign
 *      x--         |   assign the value of x and then decrement
 *      --x         |   decrement the value of x and then assign
 * 
 * Comparison       |
 * -------------------------------
 *      >           |   Greater than
 *      >=          |   Greater than or equal
 *      <           |   less than
 *      <=          |   less than or equal
 *      !=          |   not equal
 *      ==          |   equal to
 *      ===         |   same data type as well as same value
 *      !==         |   not equal value or not equal data type
 *      
 * Logical          |
 * -------------------------------
 *      &&          |   AND
 *      ||          |   OR
 *      !           |   NOT
 * 
 * OPERATOR PRECEDENCE:
 * -------------------------------
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 * 
 * Main thing to understand in this link is the table at the bottom of the page.
 */
console.log(1235 + 3625);
console.log(8569 - 6582);
console.log(253 * 652);
console.log(635214 % 3);
console.log(population++);
console.log(population--);


const massMark = 78;
const heightMark = 1.69;

const massJohn = 92;
const heightJohn = 1.95;


const BMIMark = massMark / heightMark ** 2; // ** == power of 
const BMIJohn = massJohn / (heightJohn * heightJohn);

console.log(BMIMark, BMIJohn);

let markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);


/**
 * ###############################
 *   String Template Literals
 * ###############################
 */

/**
 * in Javascript you have multiple ways of writing strings:
 * - using single quote ''
 * - using double quote ""
 * - using templete literals ``  <-- backticks 
 *      Introduced in ES6
 *      great for escaping string literals like single quotes and double quotes
 *      also great for multi-line string -- no need for \n\ -- simply enter a new line
 */

let a = "I am from dobule quote";
let b = 'I am from single quote';
let c = `I am from a template literal`;

const A = "Double quote: " + a;
const B = 'Single quote: ' + b;
const C = `Template Literal ${c}`;

const description = `${country} is in ${continent}, and its ${population} million
            people speak ${language}`;

/**
 * ###############################
 *          If / Else
 * ###############################
 */

const isTeen = 19;

if (20 > isTeen) {
  console.log("Is an Adult");
}

if (population > 33) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(`${country}'s population is ${33 - population} million below average`);
}

if (BMIMark > BMIJohn) {
  console.log(`Mark has hgher BMI`);
} else {
  console.log(`John has higher DMI`);
}


/**
 * ###############################
 *  Type Conversion and Coercion
 * ###############################
 */

//TYPE CONVERSION
const inputYear = '1945';
console.log(inputYear + 18);//<-- will output 194518 and not 1963
console.log(Number(inputYear)); //convert string to number data type
console.log(Number(inputYear) + 18); //this will output 1963

console.log(Number("John Doe"));//this will output NaN -- Not a Number, which is an invalid number
console.log(String(1945), 23); //convert numbers to strings

/**
 * Type Coercion happens whenever an operator is dealing with values with 
 * different types. Javascript will convert one value to match the other 
 * value.
 */

console.log('Five: ' + 5); //it will convert 5 into a string
console.log('36' - '10' - 3); //this will convert the strings to numbers -- opposite of +
console.log('23' * '2'); //46
console.log('44' < '88'); // true

let n = '1' + 1; //'11'
n = n - 1; // 10
console.log(n); // 10

console.log('9' - '5');
console.log('19' - '13' + '17');
console.log('19' - '13' + 17);
console.log('123' < 57);
console.log(5 + 6 + '4' + 9 - 4 - 2 - 6);


/**
 * ###############################
 *          Truthy and Falsy
 * ###############################
 */

/**
 * 5 Falsy values
 * -------------------
 * - 0
 * - empty string
 * - undefined
 * - null
 * - NaN
 * 
 * These 5 values will always convert to falsy values. All
 * other values will convert to truthy values
 * 
 * In practice the conversion is always implicit, it's always
 * type coercion behind the scenes. 
 */
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(NaN));


/**
 * ###############################
 *          == Vs ===
 * ###############################
 */

/**
 * == --> this will perform a type coercion before doing a comparison
 * === --> this will not perform a type coercion, and the comparison 
 *          must match both data type and value;
 * 
 * There's also the strict and loose version of different
 * 
 * !== --> strict version similar to ===
 * != --> loose version similar to ==
 */

let numAge = 18;
let strAge = '18';

if (strAge == 18) {
  console.log(`It's a match (loose)`);
}

if (numAge === 18) { // strAge will be false in this scenario
  console.log(`It's a match (strict)`);
}


const favourite = prompt(`What's your favorite number: `);
console.log(favourite);
console.log(typeof favourite); //will be a string

if (favourite == 420) { //'420' == 420 <-- comparing string to number
  console.log(`That's a good number!`);
}

const favourite2 = Number(prompt(`What's your other favourite number: `));
console.log(favourite2);
console.log(typeof favourite2); //will be a string

if (favourite2 === 420) { //420 == 420 <-- comparing number to number
  console.log(`That's a good number too!`);
}


// const numNeighbours = prompt(
//     'How many neighbour countries does your country have?'
// );

// const numNeighbours = Number(
//     prompt(
//         'How many neighbour countries does your country have?'
//     )
// );

// console.log(numNeighbours);

// if (numNeighbours === 1) {
//     console.log('Only 1 border!');
// } else if (numNeighbours > 1) {
//     console.log('More than 1 border');
// } else {
//     console.log('No borders');
// }



/**
 * ###############################
 *          Logical Operators
 * ###############################
 */

const hasDriversLicense = true;
const hasGoodVision = false;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasGoodVision || hasDriversLicense);
console.log(!hasDriversLicense);

const shouldDrive = hasDriversLicense && hasGoodVision;

if (shouldDrive) {
  console.log("John should be able to drive")
} else {
  console.log("Someone else should drive");
}

const isTired = true;

console.log(hasDriversLicense && hasGoodVision && !isTired);


if (language === 'english' && population < 50 && !isIsland) {
  console.log(`You should live in ${country}`);
} else {
  console.log(`${country} does not meet criteria`);
}


const scoreDolphins = (96 + 108 + 89) / 3;
const scoreKoalas = (88 + 91 + 110) / 3;

console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas) {
  console.log('Dolphins are the winner');
} else if (scoreKoalas > scoreDolphins) {
  console.log('Koalas are the winner!');
} else {
  console.log('Score is a draw.');
}

/**
 * ###############################
 *          Switch Statement
 * ###############################
 */


const day = 'Monday';

switch (day) {
  case 'Monday':
    console.log('Today is Monday');
    break;
  case 'Tuesday':
    console.log('Today is Tuesday');
    break;
  case 'Wednesday':
    console.log('Today is Wednesday');
    break;
  case 'Thursday':
    console.log('Today is Thursday');
    break;
  case 'Friday':
    console.log('Today is Friday');
    break;
  case 'Saturday': case 'Sunday':
    console.log('Today is a Weekend');
    break;
  default:
    console.log('Invalid day');
}

switch (language) {
  case 'Chinese': case 'Mandarin':
    console.log('Most number of native speakers!');
    break;
  case 'Spanish':
    console.log('2nd place in number of native speakers');
    break;
  case 'English':
    console.log('3rd place');
    break;
  case 'Hindi':
    console.log('4th place');
    break;
  case 'Arabic':
    console.log('5th most spoken language');
    break;
  default:
    console.log('Great language too');
}


/**
 * ###############################
 *    Statement and Expression
 * ###############################
 */

/**
 * Expression:
 *      a piece of code that produces a value: e.g. 3 + 4 
 *      1945
 *      true
 *      true && false
 * 
 * Statement: 
 *    a larger piece of code that is executed and does not produce a value on its own
 *    e.g.:
 *  - if/else, switch, etc
 * 
 *    statements contain expressions but not vice versa
 */





/**
 * ###############################
 * Ternary Operator - Conditional
 * ###############################
 */

/**
 * [condition] ? [if true] : [if false];
 */
const day2 = 7;
day2 > 7 ? console.log('First week'): console.log('It is not the first week');

const week = day2 >= 7 ? 'Week 1' : 'Week 2';
console.log(week);

//because ternary works like an expression it can be used in template literals as well
console.log(`${country}'s population is ${population > 33 ? 'above' : 'below'} average`);

const bill = 430;
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);


