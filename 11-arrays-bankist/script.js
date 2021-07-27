'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Mark Miller',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
//

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

//Slice Method
arr.slice(2); //start extracting at index 2(3), its inclusive
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-3));//negative starts at the end
console.log(arr.slice(1, -2));

//Splice method -- difference is, this one mutates the original array
console.log(arr.splice(2));
console.log(arr.splice(1, 2));//this starts at index 1 and remove 2 elements from the array
console.log(arr); //original array is changed

//Reverse
arr = ['a', 'b', 'c', 'd', 'e'];

const arr2 = ['l', 'k', 'j', 'h', 'g', 'f'];
console.log(arr2.reverse()); //will reverse the original array
console.log(arr2); //original is changed

//Concat
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); //spread operator works similar to concat

//Join
console.log(letters.join(' - '));
console.log('---------FOR OF ---------');
// for(const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

/**
 * forEach is a higher-order function, and it requires a call-back function
 * as it's argument.
 * forEach will loop through at the array and for each iteration it will execute
 * the call back function. It can pass in the current iteration as an arugment
 * to the call back function
 *
 * forEach passes in the current index, element, and the entire array that we are
 * loop
 *
 * first parameter is the current elment
 * second param is the current index
 * third is the entire array we are looping
 *
 * One fundamental difference is, there is no break or continue in forEach
 * It will loop through the entire array with no stop
 */
console.log('---------FOR EACH ---------');
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});


//forEach on Maps and Sets
console.log('---------FOR Each - MAPS ---------');
currencies.forEach(function (value, key, map) {

  console.log(`${key}: ${value}`);
});


console.log('---------FOR EACH - SETS ---------');
const currenciesUnique = new Set([
  'USD',
  'CAD',
  'GBP',
  'EUR',
  'USD',
  'EUR'
]);
/**
 * Sets have no keys, or indexes. therefor it uses the value as the key.
 * That's why the value and key both have the same value.
 */
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}`;
}

const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);

  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
}

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //using slice to create a copy of movements array because sort will mutate the original array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; //

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


/**
 * #######################################################################################################3
 */





/**
 * #######################################################################################################
 */

/**
 * Practice
 */

const calcAverageHumanAge = function (age) {
  const humanAges = age.map(age => age <= 2 ? 2 * age : 16 + age * 4);
  console.log(humanAges);
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);
  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  return average;
}


const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([5, 8, 6, 1, 9, 35, 15]);
console.log(avg1, avg2);


/**
 * Method Chaining
 */


const eurToUSD = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

calcDisplaySummary = function (acc) {

  const incomes = acc.movements.filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}$`;

  const out = acc.movements.filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}$`;

  const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + int, 0);

  labelSumInterest.textContent = `${interest}$`;
}

/**
 * Practice Chain
 */

const calcAverageHumanAge = (age) => {
  ages
    .mapmap(age => age <= 2 ? 2 * age : 16 + age * 4)
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
}


const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([5, 8, 6, 1, 9, 35, 15]);
console.log(avg1, avg2);


/**
 * Find Method
 *
 * retrieve one elment of an array based on a condition. It also accepts
 * a call-back function that loops over the array. The find method retrieves
 * an elment of the array as it loops over the array.
 *
 * Find method will not return a new array unlike the filter method. Find
 * method will return the first element that satisfies the condition.
 */
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

/**
 * Login
 */

//Event Handler

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin = '';
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);
  }
});


/**
 * Transfers
 */

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username) {
    currentAccount.movement.push(-amount);
    receiverAcc.movement.push(amount);

    //Update UI
    updateUI(currentAccount);
  }

})

/**
 * FindIndex Method
 *
 * returns the index of the element but not the element itself.
 *
 * findIndex will return the first element that matches the condition. Similar to indexOf
 * but with indexOf will either return true if it contains it or false if it doesn't and return the index.
 *
 * but findIndex method can accept more complex conditions.
 */

btnClose.addEventListener('click', function (e) {
  e.preventDefault();


  if (inputCloseUsername.value === currentAccount.username
    && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    // console.log(index);

    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }

  inputClosePin.value = inputCloseUsername = '';
});

/**
 * Some and Every Method
 */


// EQUALITY
console.log(movements.includes(-130)); //returns true or false based on equality

//SOME: CONDITION
const anyDeposits = movements.some(mov => mov > 200); //returns true or false based on condition
console.log(anyDeposits);

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
})

//EVERY: CONDITION -- only true if all the elements pass the condition

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//Separate callback
const deposit = mov => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


/**
* Flat and Flatmap Method
*/

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

/**
 * flat has no call bakc functions nothing.
 * It simply flatens the array, into one big array.
 * But it only goes one level deep.
 */
console.log(arr.flat());

/**
* flat(2) will go in two levels deep, so inner - inner array will also
* be flattened into one big array
*/

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));


// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

//Flat same as above cbode but method chains
// const overalBalance = accounts.map(acc => acc.movements)
//       .flat()
//       .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

/**
 * Because flattening an array and mapping is a common task. 
 * There is another method -- flatMap which does both functions at once.
 * 
 * One caveat to this method is, it only goes one level deep. If we need to go 
 * deeper we should still use flat method first and then map it after
 */
//FlaptMap  -- similar to above but using flatMap
const overalBalance2 = accounts.flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);


/**
 * Sorting Arrays methods
 */

//Strings
const owners = ['Mark', 'Adam', 'Laural', 'Katy'];
console.log(owners.sort()); //mutates the original array
console.log(owners);


//Numbers
console.log(movements);
// console.log(movements.sort()); //commented because it will mutate the array
/**
 * Sort method does the sorting based on string, it will basically convert
 * all the numbers in the above array into strings first and then sort them.
 * 
 * To fix the above issue we can use a compare call-back function with two parameters.
 * 1. The current value. 2. the next value. 
 * 
 * How this call-back function works. Think of a, b as two consecutive params in the array
 * if it returns less than 0; then a is before b. and if it returns greater than 0 then 
 * b is before a. 
 */

//return < 0, A, B -- keep order
//return > 0, B, A -- switch order
//Sort ASC
// movements.sort((a,b) => {
//   if(a > b) return 1;
//   if(b > a) return -1;
// });
// console.log(movements);

movements.sort((a, b) => a - b); //works similar to above code
console.log(movements);

//Sort Desc
// movements.sort((a,b) => {
//   if(a > b) return -1;
//   if(b > a) return 1;
// });
// console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);


const sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


/**
 * Creating arrays progromatically
 */

const x = new Array(7); //create array of size 7 using array constrctor
// x.fill(1); //will fill the entire array with 1, and it will mutate the underlying array 


// x.fill(1, 3); //will start filling at index 3
// x.fill(1,3,5); //will start filling at index 3 and stop filling at index 5

const arr5 = [1, 2, 3, 4, 5, 6, 7];
arr5.fill(23, 2, 6);
console.log(arr5);

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_cur, i) => i + 1);
console.log(z);


labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('$', '')));

  // const movementsUI2 = [...document.querySelectorAll('.movements__value')]; //same as above code

  console.log(movementsUI);
})


/**
 * Choosing between array methods:
 * 
 * - Do we want to mutate the original array 
 *      - Add to original
 *          - .push (end)
 *          - .unshift (start)
 * 
 *      - Remove from original
 *          - .pop (end)
 *          - .shift (start)
 *          - .splice (any)
 * 
 *      - Others
 *          - .reverse
 *          - .sort
 *          - .fill
 * 
 * - Do we want a new array
 *      - Compute from original
 *          - .map (loop)
 * 
 *      - Filtered using condition
 *          - .filter
 * 
 *      - Portion of original
 *          - .slice
 * 
 *      - Adding original to other
 *          - .concat
 * 
 *      - Flattenting the original array
 *          - .flat
 *          - .flatMap
 * 
 * - Want an array index
 *      - Based on value
 *          - .indexOg
 * 
 *      - Based on test condition
 *          - findIndex
 * 
 * ------ want an entire array element
 *      - Based on test condition
 *          - .find
 * 
 * - Want to know if array includes something
 *      - Based on value
 *          - .includes
 * 
 *      - Based on test condition
 *          - .some
 *          - .every
 *  
 * ------ Want a new String
 *      - Based on separator string
 *          - .join
 * 
 * - Want to transform to value
 *      - Based on accumulator
 *          - .reduce 
 *              boil down array to single value of any type: number, string, boolean, or even new array or object
 * 
 *    -- To just loop array
 *      - Based on callback
 *          - .forEach
 *              Does not create a new array, just loops over it 
 */


/**
 * More Array Practice
 */

// const bankDepositSum = accounts.map(acc => acc.movements); //array of movements for each account
// console.log(bankDepositSum);


//Get total deposit in the bank from all accounts
const bankDepositSum = accounts.flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);


//number of deposits over 1000
const numDeposits1000 = accounts.flatMap(acc => acc.movements)
  .reduce((count, cur) => cur >= 1000 ? ++count : count, 0);
// .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);


//contain sum of deposits and withdrawal
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce((sums, cur) => {
    // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
    sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // same as above
    return sums;
  }, { deposits: 0, withdrawals: 0 });

console.log(deposits, withdrawals);

//Convert any string to title case
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => exceptions.includes(word) ? word : capitalize(word))
    .join(' ');

  return capitalize(titleCase);
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this Is a long Title'));



const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

//loop over dogs array and calculate recomended food for each dog
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// find Sarah's dog, and log if it's eating too much or too little
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(`Sarah's dog is eating ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'}`);

//cerate an array for owners whos dogs eat too much, and for owners whos dogs eat too little
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//log all owners whos dogs eat too much and too little
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dpgs eat too little`);

//log whether there is a dog eating exactly the amount recommended
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//log to console for any dog eating okay amount of food
const checkEatingOkay = dog => {
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
}
console.log(dogs.some(checkEatingOkay));

//same as previous one but use a function
console.log(dogs.filter(checkEatingOkay));

//create a shallow copy of the array and sort it by recommended food portion in ASC order
const dogsSorted = dogs.slice().sort((a,b) => a.recFood - b.recFood);
console.log(dogsSorted);

