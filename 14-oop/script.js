'use strict';

/**
 * High level overview of OOP
 * ##########################
 */

/**
 * 
 * 
 * OOP is a programming paradigm (how we write and organize code) in JS based on the concept of objects.
 * Using objects to model (describe) real-world or abstract features.
 * 
 * Objects can contain data(properties) and code(methods). By using objects, we pack data and behavior 
 * into one block.
 * 
 * Objects are self contained pieces of code. They are building blocks of applications, and interact with 
 * one another. Interactions happen through a public interface (API): methods that the code outside of the object
 * can access and use to communicate with the object. 
 * 
 * 
 * DESIGNING CLASSES
 * ========================
 * 
 * Abstraction
 * -----------
 *              To ignore or hide details that don't matter, allowing us to get an overview perspective
 *              of the thing being implemented. Instead of messing with the details that don't matter.
 * 
 * Encapsulation
 * -------------
 *              Encapsulation: keeping properties and methods private inside the class, so they are not accessible 
 *              from outside the class. Some methods can be exposed as a public interface (API)
 * 
 * Inheritance
 * -----------
 *              Inheritance can greatly help reduce duplicate code by adding common functinoalitties and properties
 *              from parent class to child class. Reusing logic and properties are easier.
 * 
 * Polymorphism
 * ------------
 *              Polymorphism: Achild class can overwrite a method it inherited from a parent class.
 * 
 * 
 */

/**
 * OOP in JS and compared to other languages
 * -------------------------------------------
 * 
 * In JS we have 'Prototype' and all objects are linked to a prototype object. 
 * The prototype contains methods and properties that the object linked to it can
 * access and use. 
 * 
 * ************************************************
 * Protypal Ineritance: The prototype contains methods (behavior) that are accessible
 * to all objeccts linked to that prototype. 
 * ************************************************
 * 
 * How do we implement prototypal inheritance in JS
 * 
 * We have 3 ways of creating this:
 * 1. constructor functions
 *      - Technique to create objects from a function
 *      - This is how built-in objects like Arrays, Maps or Sets are implemented
 * 2. ES6 Classes
 *      - Modern alternative to constructor function syntax
 *      - "Syntax sugar": behind the scenes, ES6 classes work exactly like contructor functions
 *      - ES6 classes do not behave like classes in "classical OOP"
 * 3. object.create()
 *      - The easiest and most straight-forward way of linking an object to a prototype object.
 * 
 */

//only works with function expression/declaration not arrow functions
const Person = function(firstName, height) {
    // console.log(this);
    //instance properties
    this.firstName = firstName;
    this.height = height;

    //Never create method inside the constructor function, because it will carry over to every object
    // this.calcHeightInch = function() {
    //     return this.height / 2.54;
    // }

}

const mark = new Person('Mark', 185);
/**
 * 1. new {} object is created
 * 2. function is called, this = {}
 * 3. {} linked to prototype
 * 4. function automatically return {}
 */
console.log(mark);

const matilda = new Person('Matilda', 165);
const jack = new Person('Jack', 250);
console.log(matilda, jack);

const jay = 'Jay';

console.log(mark instanceof Person);
console.log(jay instanceof Person);
// console.log(mark.calcHeightInch());


//Using Prototypes
/**
 * Each and every function in JS automatically has a property called prototype including
 * the constructor functions. 
 * 
 * Every object created using certain constructor function will have access to all methods
 * and properties that were defined on the constructor's prototype property. 
 * e.g. Person.prototype.
 * 
 */
console.log(Person.prototype);

Person.prototype.calcHeightInch = function() {
    console.log(this.height / 2.54)
}

mark.calcHeightInch();//we can access this method even tho it isn't part of the Person method
//thanks to prototypal inheritance the Person class has access to it

/**
 * This way there exists one copy of the method calcHiehgtInch in proptotyp
 * and every instance of the Person class has access to it. Instead of creating
 * the same method for every object.
 */

matilda.calcHeightInch();

/**
 * Any object always has access to the methods and properties from it's prototype.
 * The prototype of Person is prototype. 
 * 
 * Each object has a special property called __proto__. this is the prototype of the object
 * (jack for example) it's not the prototype property, but it is simply the prototype. 
 * 
 * The prototype of the object is essentially the prototype property of the contructor
 * function. 
 * 
 * Person.prototype is the prototype that will be used for all objects created with the 
 * Person constructor function. 
 */
console.log(jack.__proto__);
console.log(jack.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jack));

Person.prototype.species = 'Homo Sapiens';
console.log(jack.species, matilda);
console.log(jack.hasOwnProperty('firstName'));
console.log(jack.hasOwnProperty('species'));

/**
 * Prototypal inheritance and the prototype chain
 * 
 * The person constructor function has a prototype property which is an object and inside
 * this object we defined the calcHeightInch method. 
 * 
 * Person.prototype has a reference back to Person, which is the constructor property. So
 * Person.prototype.constructor will point back to itself. 
 * 
 * NOTE: Person.prototype is not the prototype of person, but the prototype for all objects
 * created through the Person function.
 * 
 * 
 * ==========
 * When we create an object using the new operator. 
 * When we call function with the new operator:
 * 1. first thing it does is create an empty object
 * 2. then the 'this' keyword is set to the newly created object
 * 3. The new object is then linked (__proto__property) to the constructor function's 
 * protottype property --> __proto__: Person.prototype;
 * 4. Finally the new object is returned from the constructor function call
 * 
 * This is the process for function constructors and ES6 classes. But not object.create
 * function
 * 
 * If an object calls a method or property that doesn't exist JS will then look into 
 * the object prototype to find it. 
 * 
 * 
 * Since all objects in JS has a prototype, and Person.prototype is an object; it too 
 * has a prototype. 
 * 
 * The prototype of Person.prototype is Object.prototype; The Person.prototype is just an
 * object built by the built-in Object contructor function. 
 * 
 * This is also the function called whenever we create an object literal. The prototype
 * of Object.prototype is __proto__: null; which marks the end of the prototype chain.
 * 
 * 
 */

/**
 * Prototype Practice
 */

//constructor function
const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
}

//create objects
const car1 = new Car('BMW', 120);
const car2 = new Car('Audi', 100);


console.log(car1, car2);

//create property to the prototype that will be accessible by all objects
Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
}

Car.prototype.brake = function () {
    this.speed -= 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
}

car1.accelerate()
car1.accelerate();
car1.brake();
car1.accelerate();

//ES6 CLASSES

//class expression
// const PersonCl = class {}


//class declaration
class PersonCl {

    constructor(firstName, height) {
        this.firstName = firstName;
        this.height = height;
    }

    //methods will be added to .prototype property
    calcHeightInch() {
        console.log(`Height is: ${this.height / 2.54} inches`);
    }
}

const jessica = new PersonCl('Jessica', 188);
console.log(jessica);
jessica.calcHeightInch();
console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function() {
    console.log(`Hello ${this.firstName}`);
}

jessica.greet();

/**
 * ES6 CLASSES NOTE:
 * -----------------
 * 1. Classes are NOT hoisted, not even if they are function declaration
 * 2. Classes are first-class citiziens: meaning they can be passed to into functions
 *      as well as return them from functions. 
 * 3. The body is always executed in strict mode. 
 */

/**
 * Getters and Setters
 */

const account = {
    owner: 'Vince',
    movements: [200,100,400,300,560],
    get latest() {
        return this.movements.slice(-1).pop();
    },
    set latest(mov) {
        this.movements.push(mov)
    }
}

console.log(account.latest); //we write it as a property even tho it's a method
account.latest = 150;
console.log(account.movements);

class PersonCl2 {

    constructor(fullName, height) {
        this.fullName = fullName;
        this.height = height;
    }

    //methods will be added to .prototype property
    calcHeightInch() {
        console.log(`Height is: ${this.height / 2.54} inches`);
    }

    get getHeight() {
        return this.height;
    }

    set fullName(name) {
        if(name.includes(' ')) this._fullName = name;
        else console.log(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        return `Hey there`;
    }
     
}

const jess = new PersonCl2('Jess Davis', 230);
console.log(jess);
console.log(jess.getHeight);


/**
 * Static Methods
 */

Person.hey = function() { //this will not be inherited by the objects of this class
    return `Hey there`;
}

PersonCl.hey = function() { //this will not be inherited by the objects of this class
    return `Hey there`;
}

const p2 = new PersonCl('Person object', 155);
const p3 = new Person('Person constructor', 135);

console.log(Person.hey());
console.log(PersonCl.hey());
console.log(PersonCl2.hey());
// p2.hey(); //will fail
// p3.hey() //will fail


/**
 * Object.create
 * 
 * we can use this to manually set the prototype to any other prototype we want
 */


//creating a prototype
const PersonProto = {
    calcHeightInch() {
        console.log(`Height is: ${this.height / 2.54} inches`);
    },
    init(firstName, height) {
        this.firstName = firstName;
        this.height = height;
    }
}

//set the above to the prototype 
const steven = Object.create(PersonProto); 

console.log(steven);

steven.name = 'Steven';
steven.height = 205;
steven.calcHeightInch();

console.log(steven.__proto__ === PersonProto);

const sara = Object.create(PersonProto);
sara.init('Sara', 175);
sara.calcHeightInch();
console.log(sara);


/**
 * ES6 Class Practice
 */

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate () {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed}km/h`);
    }
    
    brake () {
        this.speed -= 10;
        console.log(`${this.make} is going at ${this.speed}km/h`);
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}

const ford = new CarCl('Ford', 150);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 120;
console.log(ford)

/**
 * Inheritance between classes.
 * 
 * 
 */

//Let student inherit from the Person class
const Student = function(firstName, course, grade, height) {
    Person.call(this, firstName, height);
    this.grade = grade;
    this.course = course;
}

/**
 * We have to manually set the student prototype to the person prototype
 * This should always be done before any Student prototype methods/properties are
 * created, in this case before the introduce method is created
 */
//Linking prototype
Student.prototype = Object.create(Person.prototype); 

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student('Mike', 'Comp Science', 3.5, 200);
console.log(mike);
mike.calcHeightInch(); //we can access Person methods now

console.log(mike);
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

/**
 * Construction Fucntion Prototype Practice
 */

 const Car3 = function(make, speed) {
    this.make = make;
    this.speed = speed;
}

//create property to the prototype that will be accessible by all objects
Car3.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
}

Car3.prototype.brake = function () {
    this.speed -= 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
}

const EV = function(make, speed, charge) {
    Car3.call(this, make, speed);
    this.charge = charge;
} 


//Linking the prototype
EV.prototype = Object.create(Car3.prototype);


EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo;
};

//override the Car accelerate method
EV.prototype.accelerate = function() {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} is going at ${this.speed} km/h,
    with a charge of ${this.charge}`);
}

const tesla = new EV('Tesla', 120, 55);
tesla.chargeBattery(90);
console.log(tesla);

tesla.brake();
tesla.accelerate();

/**
 * ES6 Prototype Practice
 */

class Student2 extends PersonCl2 {
    constructor(fullName, height, course) {
        super(fullName, height); //needs to happen first before anything else in the constructor
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    calcHeightInch() {
        console.log(`I'm ${this.height / 2.54} tall`);
    }
}

const martha = new Student2('Martha Jones', 212, 'Comp Science');
console.log(martha);

martha.introduce();
martha.calcHeightInch();

//Inheritance with Object.create

const PersonProto2 = {
    calcHeightInch() {
        console.log(this.height / 2.54);
    },

    init(firstName, height) {
        this.firstName = firstName;
        this.height = height;
    }
}

const john = Object.create(PersonProto2);

const StudentProto = Object.create(PersonProto2); //empty Student Prototype
StudentProto.init = function(firstName, height, course) {
    PersonProto2.init.call(this, firstName, height);
    this.course = course;
}

StudentProto.introduce = function() {
    console.log(`Hello my name is ${this.firstName} and I'm taking ${this.course}`);
}
const jayce = Object.create(StudentProto); //use the empty student prototype 
//jay's prototype is the empty student prototype which has the person prototype as it's prototype
//so now jay has access to person prototype
jayce.init('Jay', 195, 'Web development');
jayce.introduce();
jayce.calcHeightInch();


/**
 * More Examples
 */


class Account {
    //Public fields(on instances -- available on all objects)
    locale = navigator.language;
    
    
    //private fields (available on instance only not on prototype)
    #movements = []; //private field might not be supported on some browsers
    #pin;
    
    
    
    
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        //protected property
        // this._movements = [];
        // this.locale = navigator.language;
        
        console.log(`Thanks for openning an account, ${owner}`);
    }
    
    //public methods
    //public interface
    getMovements() {
        return this.#movements;
    }
    
    deposit(val) {
        this.#movements.push(val);
        return this;
    }
    
    withdraw(val) {
        this.deposit(-val);
        return this;
    }
    
    
    requestLoan(val) {
        if(this.#approveLoan(val)) {
            this.deposit(val);
            console.log('Loan Approved');
            return this;
        }
    }
    
    
    //private methods -- private methods not yet supported on some browsers
    #approveLoan(val) {
        return true;
    }
    
}

const acct1 = new Account('John Doe', 'CAD', 1111);
console.log(acct1);
acct1.deposit(250);
acct1.withdraw(100);
acct1.requestLoan(1000);
// acct1._approveLoan(150);
console.log(acct1);
// console.log(acct1._pin);

console.log(acct1.getMovements());


// console.log(acct1.#movements);

/**
 * Chaining class methods
 */
console.log(acct1.getMovements());


/**
 * Last Practice
 */

class EVCl extends Car {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.chargeTo = chargeTo;
    }

    accelerate() {
        this.speed += 20;
        this.#charge--;
        console.log(`${this.make} is going at ${this.speed} km/h,
        with a charge of ${this.charge}`);
    }
}

const revian = new EVCl('Rivian', 120, 23);

