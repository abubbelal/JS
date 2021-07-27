'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Bank App

/////////////////////////////////////////////////
// Data


const account1 = {
  owner: 'test',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1234,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {

  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // const day = `${date.getDate()}`.padStart(2, 0);//start of string should be 2 characters long, empty space is covered with 0
  // const month = `${date.getMonth()}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    /**
     * looping over the movements and the dates arary in teh accounts
     */
    const date = new Date(acc.movementsDates[i]);

    // const day = `${date.getDate()}`.padStart(2, 0);//start of string should be 2 characters long, empty space is covered with 0
    // const month = `${date.getMonth()}`.padStart(2,0);
    // const year = date.getFullYear();
    // const displayDate = `${day}/${month}/${year}`;

    // const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
}

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
      }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long', //numeric, 2-digit
      year: 'numeric',
      weekday: 'long' //long == monday, numeric, short, narrow
    }

    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // //Create current date and time
    // const now = new Date(); //date as of now
    // const day = `${now.getDate()}`.padStart(2, 0);//start of string should be 2 characters long, empty space is covered with 0
    // const month = `${now.getMonth()}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString()); //add current date to the movement date
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () { // Add movement
      currentAccount.movements.push(amount);

      //Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString()); //add current date to the movement date

      // Update UI
      updateUI(currentAccount);

      //reset timer
      clearInterval(timer);
      timer = startLogOutTimer();

    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////


/**
 * All numbers are represented as floating point numbers in Javascript. So 23 == 23.0
 * They are stores in 64 bit format. 
 */

console.log(Number('23'));
console.log(+'23');//the plus will automatically do type coercion, having same result as above

//Parsing
console.log(Number.parseInt('38px   '), 10);//we can use the Number object to parse as well
console.log(Number.parseFloat('2.5rem  '), 10); //the second argument is the number base system being used-- base 10

//Check if value is NaN
console.log(Number.isNaN(20)); //returns true if it's not a number--false
console.log(Number.isNaN('20'));//true
console.log(Number.isNaN(23 / 0));

//Check if value is a number
console.log(Number.isFinite(20));//better way of checking is something is not a number
console.log(Number.isFinite(20 / 0));

console.log(Number.isInteger(45));
console.log(Number.isInteger(45 / 0));


/**
 * Math and rounding numbers
 */
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); //getting square root
console.log(8 ** (1 / 3)); //getting cubic root

console.log(Math.max(5, 23, 54, 6, 8));
console.log(Math.max(34, 23, 4, 56, '45')); //it also does automatic type coercion

console.log(Math.min(3, 6, 57, 86, 44, 3));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
//0..1 -> 0...(max-min) -> min....(max)

console.log(randomInt(5, 15));

console.log(Math.trunc(23.3));
console.log(Math.round(25.4));
console.log(Math.ceil(12.3));
console.log(Math.floor(52.9));

//they all do type coercion as well
console.log(Math.trunc('23.3'));
console.log(Math.round('25.4'));
console.log(Math.ceil('12.3'));
console.log(Math.floor('52.9'));

console.log(Math.trunc(-25.5)); //trunc will simply drop the decimal -- -25
console.log(Math.floor(-25.5)); //floor is better at rounding negative numbers than trunc -26

//Rounding decimals
console.log((2.5).toFixed(0));//toFixed will return a string not a number
console.log((5.4).toFixed(3));//3 decimal places
console.log(+(4.2345).toFixed(2));//2 decimal places and + will convert to number

/**
 * Modulus operator
 */

console.log(5 % 2);
console.log(5 / 2); //5 = 2 + 2 + 1
console.log(8 % 3);
console.log(8 / 3); //8 = 3 + 3 + 2

console.log(6 % 2);

const isEven = n => n % 2 === 0;
console.log(isEven(5));
console.log(isEven(8));


labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered'; //every second row
    if (i % 3 === 0) row.style.backgroundColor = 'blue'; //every third row
  });
})

/**
 * BigInt data type
 */


console.log(2 ** 53 - 1); //biggest number that Javascript can represent
console.log(Number.MAX_SAFE_INTEGER); //Max integer number can store safely

console.log(23423423423423252342342352342342342352234234n);//the n can transform a regular number to a bigInt
console.log(BigInt(234234234));

//operations
console.log(1000n + 2345234n);
console.log(2345098589359234n * 2397985234098234n);

const huge = 97834058092348979862343546456n;
const num = 44;
// console.log(huge * num);//will not work because cannot mix bigint with numbers
console.log(huge * BigInt(num)); //can use bigint constructor to convert number to bigint

console.log(20n > 4);//comparison still works
console.log(20n === 20);//this will be false because the data type is different 
console.log(20n == 20);

console.log(huge + ' -- is really big');

// console.log(Math.sqrt(16n)); //math operations also fail on bigint

console.log(10n / 3n); //bigint will cut off the decimal
console.log(10 / 3);

/**
 * Dates and Times
 */
//Create a date
const now = new Date();
console.log(now);

console.log(new Date('Aug 02 2018 18:05:41'));
console.log(new Date('December 14, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2055, 10, 19, 15, 23, 5));//November 19 2055 at 15:23:05
console.log(new Date(2033, 10, 35)); //date function will automatically move to next month when you go over it
//november doesn't have 35 days so it will just move to december

console.log(new Date(0));//beginning of unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //3 days after beginning of unix time

//Working with dates
const future = new Date(2055, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());//time past since begining of unix time
console.log(Date.now());
future.setFullYear(2044);//there also exists set methods
console.log(future);

//fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// MOVED to displayMovements
// const now = new Date(); //date as of now
// const day = `${now.getDate()}`.padStart(2, 0);//start of string should be 2 characters long, empty space is covered with 0
// const month = `${now.getMonth()}`.padStart(2,0);
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`

//day/month/year

/**
 * Operations with date
 */

console.log(Number(future)); //can convert date to number
console.log(+future); //+ is a shorter way of type coercion

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2045, 4, 25), new Date(2033, 4, 24));
console.log(days1);


/**
 * Javascript internationalize API
 */

// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long', //numeric, 2-digit
//   year: 'numeric',
//   weekday: 'long' //long == monday, numeric, short, narrow
// }

// const locale = navigator.language;
// console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat('en-US').format(now); //language-country -- called local
// labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now); //language-country -- called local
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

//Internationalize numbers
const num = 543463453453;



console.log('US: ', new Intl.NumberFormat('en-US').format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE').format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY').format(num));
console.log('Canada: ', new Intl.NumberFormat(navigator.language).format(num));//get the locale from the browser

const options = {
  style: "unit",
  unit: "mile-per-hour",
}

const options = {
  style: "unit",
  unit: "celsius",
}

const options = {
  style: "percent",
  unit: "",//this is ignored in percent
}

const options = {
  style: "currency",
  unit: "",///this is ignored
  currency: 'CAD', //this has to be set manually
  useGrouping: false, //numbers will be printed without separaters
}

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log('Canada: ', new Intl.NumberFormat(navigator.language, options).format(num));//get the locale from the browser


/**
 * Set timout timer -- runs just once after a defined time
 *    we do not call the settimeout function, we pass in a callback function as an 
 *    argument and it is this callback function that will call the timeout function
 *    for us. 
 * 
 * set interval timer -- keeps running until stopped
 */

//JS will start the timer soon as it comes to this line of code, but it will continue executing the rest while the timer runs
setTimeout(() => console.log('Here is the timeout'), 3000);//after 3 seconds call the function
console.log('Waiting...');

//the third arguments becomes the argument passed to the callback function, same with the fourth argument
setTimeout((ing1, ing2) => console.log(`ING1: ${ing1} ING2: ${ing2}`), 3000, 'mushroom', 'tomator');
console.log('Waiting2...');

const ingre = ['olives', 'spinach'];
const ingreTimer = setTimeout((ing1, ing2) => console.log(`Ingredients are: `, ing1, ing2), 2000, ...ingre);
console.log('Waiting3....');
/**
 * we can clear the time out as well. 
 * In this scenario if the ingredients includes spinach clear the timeout
 */
if (ingre.includes('spinach')) clearTimeout(ingreTimer);



//Set Interval -- every second this will be called
// setInterval(function() {
//   const now = new Date();
//   console.log(now);
// }, 1000);

const startLogOutTimer = function () {

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = time % 60;

    //in each call, print remaining time to ui
    labelTimer.textContent = `${min}:${sec}`;


    //when 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    //decrease 1s
    time--;
  }

  //set time to 5 minutes
  let time = 300

  tick();

  //call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
}