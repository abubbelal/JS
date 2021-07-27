'use strict';

/**
 * Javascript engine:
 *      Simply a program that executes javascript code, browsers use their
 *      own engine. Most popular Javascript engine is Google Chrome's V8 engine
 *      which powers chrome as well as nodejs. 
 * 
 *      Any Javascript engine includes a 'Call Stack' and a 'Heap'. The call stack
 *      is where the code is executed using execution context, and the Heap is an un 
 *      structured memory pool which stores all the object in memory that our application
 *      needs.
 * 
 * -------------------------------------------------------------------------------------------
 *      Compilation:
 *          the entire source code is converted into machine code at once, and this machine 
 *          code is then written to a binary file that can be executed by the computer. 
 *          
 *      Interpretation:
 *          Interpreter runs through the source code and executes it line by line.
 * -------------------------------------------------------------------------------------------
 *      Javascrip used to be an interpreted language, modern browsers use a mix of intrepretation
 *      and compilation --> Just-in-time (JIT) compilation. Entire code is converted into machine 
 *      code at once, then executed immediately. 
 * 
 *      As Javascript code enters the engine, the first step is to parse the code -- or reading 
 *      the code. During the Parsing process, the code is parsed into a data structure called the 
 *      abstract syntax tree (AST). 
 * 
 *      AST will split each line of code into pieces that are meaningful to the language; like 
 *      let, const, function, keywords. Then it saves all these pieces into the tree in a structured 
 *      way; this step will also check for any syntax errors, and the resulting tree will then be 
 *      used to generate the machine code. 
 * 
 *      The next step is compilation; which takes the generated AST and compiles it into machine code.
 *      This machine code will be executed right away. Execution happens in the call stack. 
 * 
 *      Now the first compilation is a very unoptimized version of the code in the beginning, just so 
 *      it can start executing as fast as possible. Then in the background this code is being
 *      recompiled and executed during the already executed program, it's continuously being optimized.
 * 
 *      Overview:
 *          Code --> Parsing --> Generate AST --> Compilation AST --> Execution --> Optimize --> 
 *              Compile and repeat.
 * 
 * -------------------------------------------------------------------------------------------     
 *  Javascript Runtime:
 *      The most common Javascript runtime is the browser. The browser has a lot already included tools 
 *      necessary for Javascript. At the heart of the runtime is the engine. Plus we also need to use the 
 *      Web APIs (DOM, Timers, Fetch, ..), as well as Callback Queue. 
 * -------------------------------------------------------------------------------------------
 * 
 * Javascrip Execution:
 *      Once the code is finished copmiling; a global execution context is created (for top-level code) any 
 *      code not inside a function. Functions are only executed when they are called. An execution context is
 *      an abstract environment in which a piece of Javascript is executed. Stores all the necessary information
 *      for some code to be executed. Javascript code is always executed inside an execution-context. Regardless 
 *      of the Javascript code there is only one execution context (EC): default context, created for code that 
 *      is not inside any function (top-level). 
 * 
 *      Once the code is inside the execution context (inside the environment) it will be executed. The next step
 *      is the execution of top-level code (inside global EC). Once the top-level code is finshed executing, 
 *      functions will start to execute as well; plus waiting for callbacks. 
 * 
 *      Once executino context per function: for each function call, a new execution context is created. 
 *      All the execution context together make the call stack. 
 * 
 *      When everything is finished executing the engine will for callback functions to arrive and execute these.
 *      The event loop provides the callback functions. 
 * 
 * -------------------------------------------------------------------------------------------
 * 
 * Inside Execution Context:
 *      1. Variable environment:
 *          let, const, var -- functions -- arguments objects
 *      2. Scope chain
 *          references to variables outside the current function
 *      3. this keyword
 *      
 *      All these are generated during "created phase", which happens right after execution. FYI 
 *      arrow functions don't get arguments or this keyword. Instead they can use the argument or this 
 *      keyword from their closest regular function. 
 * 
 * Inside the Callstack:
 *      Execution Context are placed inside the callstack in order to keep track of where we are in process of 
 *      execution. Stacked on top of each other. Execution context on top is the current one running, once it's finished
 *      it's removed and the other one is executed. 
 * -------------------------------------------------------------------------------------------
 *
 * Scoping and Scope:
 *      scoping: how our program's variable's are organized and accessed
 * 
 *      Lixical scoping: scoping is controlled by placement of functionso and blocks in the code
 * 
 *      Scope: space or environment in which a certain variable is declared (variable environment in case 
 *      of functions). There is global scope, function scope, and block scope.
 * 
 *      Scope of a variable: Region of our code where a certain variable can be accessed 
 * 
 *      3 Types of scope:
 *          
 *          Global Scope:
 *              outside of any function or block, variables declared in global scope are accessible everywhere
 *          Function Scope:
 *              variables are accessible only inside function, NOT outside. Also called local scope
 *          Block Scope (ES6):
 *              Variables are accessible only inside block (block scoped). However, this only applies to 
 *              let and const variables, NOT var. Functions are also block scoped (only in strict mode).
 *              var is function scoped whlie let and const are block scoped.
 * 
 *      Scope Chain:
 *          Every scope always has access to it's parent's scope. All variables in parent and above can be accessed 
 *          inside the child scope.
 * 
 * -------------------------------------------------------------------------------------------
 *  
 */


function calcAge(birthYear) {
    const age = 2045 - birthYear;
    console.log(firstName); //still accessible because firstName is global
    function printAge() {
        const output = `${firstName} You are ${age}, born in ${birthYear}`;
        console.log(output);

        if(birthYear >= 1981 && birthYear <= 1998) {
            const firstName = 'Doe';
            // const str = `Oh, and you're a millenial, ${firstName}`;
            var str = `Oh, and you're a millenial, ${firstName}`;
            function add(a,b){
                return a * b;
            }
            
        } 
        console.log(str); //const is block scope and not accessible outside
        // add(2,3);//functions are block scoped in strict mode
    }
    printAge();
    return age;
}

const firstName = 'John';
console.log(calcAge(1989));


/**
 * -------------------------------------------------------------------------------------------
 * Hoisting
 *      makes some types of variables accessible/usable in the code before they are actually 
 *      declared. "Variables lifted to the top of their scope."
 * 
 *      Behind the scenes; before execution, code is scanned for variable declrartions, and for
 *      each variable, a new property is created in the variable environment object. 
 * 
 *      It doesn't work the same for all types:
 * 
 * Function Declarations:
 *      hoisted -- Yes
 *      Initial value -- Actual function
 *      Scope -- block(only in strict mode, otherwise: function)
 * 
 * var variables:
 *      hoisted -- yes
 *      initial value -- undefined
 *      scope -- function
 * 
 * let and const:
 *      hoisted -- NO -- technically hoisted but they have no value, so it's set to uninitialized
 *      initial value -- <uninitialized>, TDZ (Temporal Dead Zone)
 *      scope -- Block
 * 
 * function expressions and arrows
 *      hoisted --
 *      initial value --
 *      scope -- 
 *          Depends if using var or .et/const
 */

// console.log(me);
// console.log(job);
// console.log(year);

var me = 'Contoso';
let job = 'Developer';
const year = 1955;

// console.log(addDec(2,3));
// console.log(addExpr(4,5));
// console.log(addArrow(4,5));

function addDec(a,b){
    return a + b;
}

const addExpr = function (a,b) {
    return a+b;
}

let addArrow = (a,b) => a+b;


console.log(numProducts);
if(!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
    console.log('All products deleted!');
}


/**
 * var variables create a property to the window object. let and const will not
 */

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(window.y);
console.log(window.z);

/**
 * 'this' keyword/variable is a special variable that is created for every execution context 
 * (every function). It takes the value of (points to) the "owner" of the function in which
 * the 'this' keyword is used.
 * 
 * 'this' is NOT static, and it's value depends on how the function is called; and it's only
 * assigned when the function is actually called. There are multiple ways a function is called:
 * 
 *      - a method --> 'this' == <Object that is calling the method>
 *      - Simple function call -- 'this' == undefined, but only in strict mode, otherwise: 'this == window
 *      - Arrow functions -- 'this' == <this of surrounding function (lexical this)>
 *      - Event listener -- 'this' == <DOM element that the handler is attached to>
 *      - new, call, apply, bind
 * 
 * The 'this' keyword does NOT point to the function itself, and also NOT the its variable environment
 * 
 */

//A method
const person = {
    name = 'John',
    lastname = 'Doe',
    fullName: function () {
        /**
         * in this scenario the 'this' keyword will have the value of the object
         * that is calling it -- person. 
         * this.name == person.name 
         */
        return this.name + " " + this.lastname; 
    }
};

person.fullName();

console.log(this); //referring to the window object

const calcAge2 = function (birthYear) {
    console.log(2085 - birthYear);
    console.log(this); //will be undefined in strict, global window in loose mode
}

calcAge2(1865);


const calcAge3 = (birthYear) => {
    console.log(2085 - birthYear);
    console.log(this); // referring to window, using lexical will referr to parent's scope
}
calcAge3(1865);

const john = {
    year: 1965,
    calcAge: function() {
        console.log(this); //will referr to john
        console.log(this.year);
    }
}

john.calcAge();

const doe = {
    year: 2017,
};

doe.calcAge = john.calcAge; //method borrowing

doe.calcAge(); //the this keyword will refer to 'doe' 


const f = john.calcAge; //copy the method, this isn't a method call

f();//the this keyword will be undefined


/**
 * 
 */

const person2 = {
    firstName: 'John',
    year: 1945,
    calcAge: function() {
        console.log(this);
        console.log(2099 - this.year);

        const self = this; //self or that

        //METHOD 1

        // //innerfunction
        // const isMillenial = function() {
        //     /**
        //      * this will return undefined because 'this' is undefined inside 
        //      * this function. the 'this' keyword is referring to isMillenial
        //      * which has no year property. 
        //      * 
        //      * An alternate way to fix this issue is to create another variable
        //      * and that variable to 'this' outside the function, and the use that
        //      * variable whenever referring to 'this'. 
        //      * line 310, const self = this; 
        //      */
        //     // console.log(this.year >= 1981 && this.year <= 1996);
        //     console.log(self.year >= 19821 && self.year <= 1996); //fixed using self instead of this
        // }
        
        
        //METHOD 2 -- using arrow function
        //innerfunction
        const isMillenial = () => {
            /**
             * By using an arrow function, which doesn't have it's own this keyword. 
             * it will inherit its parents this keyword, we can use this method instead 
             * of method 1 which require a extra variable outside of the function
             */
            // console.log(this.year >= 1981 && this.year <= 1996);
            console.log(self.year >= 19821 && self.year <= 1996); //fixed using self instead of this
            
        }

        isMillenial();
    },
    greet: () => {
        console.log(`Hey ${this.firstName}`)
    }
};
person2.greet(); // this will be undefined, since arrow functions don't have a this keyword
//it will rely on it's parent's this keyword, and the parent is the window object. 
// since there is no window.firstName it will be undefined.



/**
 * arguments keyword
 *      only exists in function expression and function declarations
 *      does not exists in var function expressions
 * 
 * arrow function does not have this keyword access.
 */

const argument = function(a,b) {
    console.log(arguments); //will show the arguments passed as an array
    return a + b;
}

/**
 * even tho our function expression shows two arguments being accepted, we can still pass
 * the function more argument, and we can access these arguments using the arguments keyword.
 * It will have all the parameters as an array.
 */
argument(2,5,3,6,8); //Arguments[2,5,3,6,8];

var anotherArgu = (a,b) => {
    console.log(arguments);
    return a+b;
}

anotherArgu(2,5,8); 


/**
 * Primitive vs objects
 * how primitive and reference types are stored in memory
 */

let age4 = 99;
let oldAge = age;
age = 100;
console.log(age);
console.log(oldAge);

const my = {
    name: 'contoso',
    age: 666
};

const friend = my;
friend.age = 654;

console.log('Friend: ' + friend.age);
console.log('My: ' + my.age);

/**
 * Primitive types are the basic data types:
 *      Number, String, Boolean, Undefined, Null, Symbol, BigInt
 * 
 * Objects are all reference types:
 *      Object literal, arrays, functions, etc 
 * 
 * Javascript engine has two components: call stack and heap
 * All objects (reference types) are stored in the heap. While primitives are all stored
 * in the call stack, in the execution context in which they are declared. 
 */

//primitive types
let lName = 'Contoso';
let oldLName = lastname;
lastname = 'Davis';
console.log(lastname, oldLName);

//reference type
const jessica = {
    firstName: 'Jessica',
    lastName: 'Davis',
    age: 35
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Williams';
console.log('Before marriage: ' + jessica);
console.log('After marriage: ', marriedJessica); 
//since they both point to the same memory in the heap the values are the same


//copying objects
const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Davis',
    age: 35,
    family: [
        'Alice',
        'Bob',
        'Kris'
    ]
};

/**
 * Object.assign only does a shallow copy and not a deep clone. Meaning it only works on the 
 * first level. However if we have an object inside the object, then the inner object would 
 * still be the same and still point to the same memory in the heap. 
 * 
 * Shallow copy only copies the properties in the first level, while a deep clone will copy 
 * everything. 
 */
// Object.assign({}, jessica2); //merge an empty object with jessica 2
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Williams';
console.log('Before marriage: ' + jessica2);
console.log('After marriage: ', jessicaCopy); 
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('Lauren');

console.log('Before marriage: ' + jessica2);
console.log('After marriage: ', jessicaCopy); 