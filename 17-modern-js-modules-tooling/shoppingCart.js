//Exporting module

console.log('Exporting module');


/**
 * Variables declared inside a module are scoped to this module; essentially making them
 * private to the module. 
 */
const shippingCost = 10;
export const cart = [];

/**
 * There are two types of exports in JS. 
 * - named export -- great for exporting multiple things
 * - default exports -- used when we want to export one thing per module
 */

//simply add export to the variable and it will create a named export
export const addToCart = function(product, quantity) { 
    cart.push({product, quantity})
    console.log(`${quantity} ${product} added to cart`);
}

/**
 * NOTE:: Exporting must happen in top level code, not inside inner scopes.
 * For example inside an if statement.
 */

const totalPrice = 245;
const totalQuantity = 23;

export {totalPrice, totalQuantity as qt};


//Default exports (exporting one thing)
/**
 * Here you can see there are no names involved, we are simply exporting the value
 * of this function using default export which is great for exporting one thing
 */
export default function(product, quantity) { 
    cart.push({product, quantity})
    console.log(`${quantity} ${product} added to cart`);
}