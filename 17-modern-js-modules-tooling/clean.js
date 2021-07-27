'strict mode';

//Object.freeze will only freeze the first level, it's not a deep freeze (inner objects)
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'john' },
  { value: -45, description: 'Groceries 🥑', user: 'john' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'john' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'john' },
  { value: -1100, description: 'New iPhone 📱', user: 'john' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'john' },
]);

//you can make an object immutable by using Object.freeze
const spendingLimits = Object.freeze({
  john: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0;


//Pure function with no side effects
const addExpense = function (state, limits, value, description, user = 'john') {
  const cleanUser = user.toLowerCase();

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;
  // const limit =spendingLimits?.[user] ?? 0;
  // const limit = getLimit(user);

  return value <= getLimit(limits, cleanUser) ?
    [...state, { value: -value, description, user: cleanUser }] : state;

  // budget.push({ value: -value, description, user: cleanUser });
}


const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);

// const checkExpenses = function (state, limits) {
//   // for (const entry of budget) {
//   //   // const limit = spendingLimits?.[entry.user] ?? 0;
//   //   if (entry.value < -getLimit(limits, entry.user)) {
//   //     entry.flag = 'limit';
//   //   }
//   // }

//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user) ? { ...entry, flag: 'limits' } : entry;
//   })
// };

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user) ? { ...entry, flag: 'limits' } : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);


const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget) {
  //   output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // }

  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map( entry => entry.description.slice(-2))
    .join(' / ');
    // .reduce((str, cur) => `${str} ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses);

};

logBigExpenses(1000);
console.log(budget);

