/**
 * Scripts should be divided into modules (packages). 
 * We can use npm as our repository for getting third-party packages.
 * 
 * npm is both the repository and the program we use to install and manage these
 * packages.
 * 
 * Once we have pulled all the packages we need using npm; then the next step is to go
 * through a build process. Where one big JS bundle is built. 
 * 
 * That's the final file that will be sent to browsers in production. 
 * 
 * For the build process we can simplify into two steps:
 * 
 * - Bundling --> joining all the modules into one file; this can be pretty complex 
 *          but it can also eliminate unused code, and compress our code as well.
 * 
 *          This is also important because older browsers might not be supported by
 *          modules, and it also improves performance by bundling it into one file.
 * - Transpiling / Polifilling --> Convert modern JS back to ES5. So even older browsers
 *          can understand our code without breaking: using tools like babel.
 * 
 * After these two steps we end up with a JS bundle which will be used in the live 
 * production. We don't do these steps ourselves, instead we use tools like webpack or
 * parcel which are JS bundlers. They take raw code and transform it into JS bundle. 
 * 
 * These tools are also available through npm.
 */

/**
 * Overview of modules
 * 
 * Modules: A reusable piece of code that encapsulates implementation details. Usually
 * a standalone file, but it doesn't have to be. 
 * 
 * A modules can have imports and exports. Whatever we export will be part of public API.
 * What we import are called dependecy. 
 * 
 * Modules act like small building blocks that we can put together to build more complex
 * applications.
 * 
 * Modules can be developed in isolation without thinkinh about entire codebase.
 * 
 * Abstract code: implement low-level code in modules and import these abstractions 
 * into other modules.
 * 
 * Organized Code: Modules naturally lead to a more organized codebase
 * 
 * Reuse code: modules allow us to easily reuse the same code, even across multiple projects.
 * 
 * --------------------------------------------------------------------------------------------------------------
 * 
 * As of ES6 JS has built in modules support. 
 * Modules stored in files, exactly one module per file. 
 * 
 * 
 * ES6:
 *      Top-level variables are scoped to modules
 *      Default mode -- strict mode
 *      Top-Level this is undefined
 *      imports and exports are allowes
 *      html linking is <script type="module">
 *      File downloading is Asynchronous
 * 
 * Script:
 *      Top-level variables are global
 *      Default mode is sloppy mode
 *      top level this is the window
 *      imports and exports are not allowed
 *      html linking <script>
 *      File download is Synchronous
 * 
 * Importing modules are downloaded asynchronously and imported synchronously -- meaning only after all modules 
 * are imported and downloaded then the main index will finally be executed. 
 * 
 */


// import './shoppingCart.js'; //in html this js file should be set to type="module"
// console.log('Importing module');

// import { addToCart, totalPrice as price, qt } from './shoppingCart.js';

// addToCart('bread', 5);

// console.log(price, qt);

import * as ShoppingCart from './shoppingCart.js'; //we can also import everything like a namespace

// console.log('Importing module');
// ShoppingCart.addToCart('milk', 23);
// console.log(ShoppingCart.qt);

// import add from './shoppingCart.js'; //we can provide a name to the default export
// add('pizza', 45);

console.log(ShoppingCart.cart);
ShoppingCart.addToCart('Bread', 5);
ShoppingCart.addToCart('Apples', 15);
ShoppingCart.addToCart('Chicken', 5);
console.log(ShoppingCart.cart);

/**
 * Even tho we exported an empty array (cart), we are still getting an array with elements
 * inside it. This is because the state of importing a module is a live connection. Any changes
 * we make will persist and mutate the variables
 * 
 * Imports are not copies of the export, instead they are live connections to the same copy. 
 * They both point to the same place in the memory. 
 */

/**
 * The module pattern
 * 
 */

// const shoppingCart2 = (function() {
//     const cart = [];
//     const shippingCost = 10;
//     const totalPrice = 237;
//     const totalQuantity = 23;

//     const addToCart = function (product, quantity) {
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} added to cart`);
//     }

//     const orderStock = function (product, quantity) {
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} ordered from supplier`);
//     }

//     return {
//         addToCart,
//         cart,
//         totalPrice,
//         totalQuantity
//     }
// })();

// shoppingCart2.addToCart('Apples', 4);
// shoppingCart2.addToCart('Mangos', 10);

// console.log(shoppingCart2);
// console.log(shoppingCart2.shippingCost);


/**
 * we have to initialize npm using -- npm init
 * This will create the package.json file which will hold the configuration
 * for the project.
 * 
 * Now to install a packe using npm: we can use --> npm install [package name]
 * we can install leaflet using this method
 * 
 * When we install a new package, in the package.json configuration file, a new 
 * field will be created for the dependency that will include the package we just
 * installed
 * 
 * It will also create folder 'node_modules' which will include the package
 * that was just installed.
 * 
 * We have installed the library, but to use it won't be easy without a module bundler.
 * 
 * npm install -- will read the package.json file and retrieve all the dependecies
 */

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

import { cloneDeep } from 'lodash-es';
// import { cloneDeep } from 'lodash';

const state = {
    cart: [
        {
            product: 'bread', quantity: 5
        },
        {
            product: 'pizza', quantity: 5
        }
    ],
    user: {
        loggedIn: true
    }
}

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

/**
 * Using Parcel
 * 
 * npm install parcel --save-dev
 *  now to use parcel it will have to be done in the terminal. 
 * We have to use npx 
 * npx parcel [entry point]
 * npx parcel index.html <-- the file we want to bundle up......
 */

/**
 * this code is for parcel to understand.
 * It will essetnially lets us inject any new code to our file
 * without reloading the web page and basically maintaining whatever
 * state we had in the webpage
 * 
 * NOTE it will not make it to the final build
 */
if(module.hot) {
    module.hot.accept()
}


/**
 * npm scripts is another way of running locally installed packages in the terminal
 * they're great for automating repetitive tasks.
 * 
 * in the package.json under the script field:
 * "scripts":
 *       "start": "parcel index.html"
 * this will start the parcel on index.html at the start of the script
 * we can execute this using : npm run start
 * 
 */

/**
 * when we are done developing, we have to start building the final bundle. So the compressed
 * bundle that has dead code elimination. For that we need another parcel command
 * 
 * "build": "parcel build index.html"  -- and we can execute it by -- npm run build
 */

import 'core-js/stable';

