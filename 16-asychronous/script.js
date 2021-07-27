'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/**
 * Asynchronous JS, AJAX and APIs
 */


/**
 * Sync:
 *      Most code is synchronous, meaning code is executed line by line; just like it's
 *      defined. Each line of code waits for previous line to finish. Long-running 
 *      operations block code execution.
 * 
 * 
 * Async:
 *      Code is executed after a task that runs in the "background" finishes. 
 *      Async code is non-blocking. Execution doesn't wait for async taks to finish 
 *      it's work. 
 * 
 *      It's all about coordinating behavior of a program over a period of time. Call-
 *      back functions do NOT make code asynch alone. 
 * 
 *      There are some functions that are async; like setTimeOut function for example.
 *      
 *      
 */

/**
 * AJAX
 *      Asynchronous Javascript And XML: Allows us to communicate with remote web 
 *      servers in an asynchronous way. With AJAX calls, we can request data from 
 *      web servers dynamically. 
 */

//#################################################
//AJAX call using XMLRequest

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     /**
//      * We are sending the request to the API it will be sent to the API server 
//      * Asynchronously and the rest of our code will continue to run. But we have
//      * this event listener listening to the load event and when the API server sends a 
//      * response it will be triggered.
//      */

//     request.addEventListener('load', function () {
//         // console.log(this.responseText);
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//             <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(
//                         +data.population / 1000000
//                     ).toFixed(1)} people</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//             </article>
//             `;
//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');


const renderCountry = function (data, className = '') {
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
        ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>
        `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
}

//  const getCountryDataAndNeighbor = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     /**
//      * We are sending the request to the API it will be sent to the API server 
//      * Asynchronously and the rest of our code will continue to run. But we have
//      * this event listener listening to the load event and when the API server sends a 
//      * response it will be triggered.
//      */

//     request.addEventListener('load', function () {
//         // console.log(this.responseText);
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         //render country
//         renderCountry(data);

//         //Get neighbor country
//         const [neighbor] = data.borders;

//         if(!neighbor) return;

//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//         request2.send();

//         request2.addEventListener('load', function () {
//             // console.log(this.responseText);
//             // console.log(this.responseText);
//             const data2 = JSON.parse(this.responseText);
//             renderCountry(data2, 'neighbour');
//         })
//     });
// };

// getCountryDataAndNeighbor('Canada');

/**
 * Promises and Fetch API
 * 
 * 
 * What is a promise:
 *  An object that is used as a placeholder for the future result of an asynchronous
 *  operation. 
 * 
 *  A container for an asynchronously delivered value. Or a container for a future value.
 * 
 *  - By using promises we no longer have to rely on events and callbacks passed into
 *      asynchronous functions to handle asynchronous results.
 *  - Instead of nesting callbacks, we can chain promises for a sequence of asynchronous
 *      operations: escaping callback hell.
 * 
 * Promises are time sensitive and can be in different states.
 * A promise lifecycle looks something like this:
 * 
 * - Pending: -- Before the future value is available, while it's pending it's still
 *          doing its asynchronous tasks in the background.
 * - Settled: -- When the task is finished. It can be fulfilled (success) or rejected
 *        (An error occurred when fetching data).
 * A promise is only settled once, and the state won't change after. 
 * 
 * We consume a promise when we already have a promise. 
 * 
 */


/**
 * Consuming a Promise
 */

// const getCountryData = function(country) {

//     fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function(response) {
//         // console.log(response);
//         // response.json();

//         return response.json(); 
//         /**
//          * json method returns a prmose so we have to consume another promise using the 
//          * then method below
//          */

//     }).then(function(data){
//         console.log(data);
//         renderCountry(data[0]);
//     })
// }

// getCountryData('Canada');



// //Same method as above but simplified with arrow functions
// const getCountryData = function (country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//         .then((response) => response.json())
//         .then((data) => renderCountry(data[0]))
// }

// getCountryData('Canada');



const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
}


// //Same method as above but simplified with arrow functions
// const getCountryData = function (country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//         .then((response) => {
//             console.log(response);

//             /**
//              * We can check if the fetch throws an error (anything other than 200).
//              * We can then throw an error which will immediately termiante the current
//              * function, and the current 'then' method will be a 'rejected' promise. 
//              * 
//              * And this rejected promise will propogate down to the catch method.
//              * 
//              * Any error will cause a promise to be rejected including errors thrown 
//              * manually by us; like in this case where we throw a new Error.
//              * 
//              * 
//              */
//             if(!response.ok) throw new Error (`Country not found ${response.status}`);

//             return response.json()
//         })
//         .then((data) => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders[0];

//             if (!neighbour) return;

//             //country 2 -- neighbour
//             return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);

//             /**
//              * The returned value of the above fetch will be the body of the next
//              * then method called below. The then method below will handle the next
//              * promise using the result of the above fetch, which is being returned.
//              * 
//              * Anything returned inside a then method will be used in the next then 
//              * method chained on it.
//              * 
//              * 
//              */
//         })
//         .then(response => {
//             //incase neighbor code is invalid
//             if(!response.ok) throw new Error (`Country not found ${response.status}`);
//             response.json()
//         })
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch(err => {
//             console.error(err);
//             renderError(`Something went wrong: ---- ${err.message}`);
//         })
//         .finally(() => { //this method is always called, regardless of a sucess or failure
//             countriesContainer.style.opacity = 1;
//         }); //handle error
// }

// getCountryData('Canada2');


/**
 * Handling errors in promises
 * to handle a failed fetch we can pass a second call back function to the 'then' 
 * method.
 * 
 * A better way to handle all errors is to use a catch method at the end of the chain.
 */



const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
        return response.json();

    })
}


const getCountryData = function (country) {
    getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
        .then((data) => {
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) throw new Error('No neighbour found!');

            return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Invalid Neighbour');
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            renderError(`Something went wrong: ---- ${err.message}`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
}

getCountryData('Canada');


/**
 * Practice
 */


const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(res => {
            if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
            console.log(res);
            return res.json();
        })
        .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);
            return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
        })
        .then(response => {
            if (!response.ok) throw new Error(`Country not found (${response.status})`);
            return response.json();
        })
        .then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message}`))
};


whereAmI(52.508, 13.381);


/**
 * Event loop in practice
 */

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res))
console.log('Test end');
/**
 * Any top level code (code outside of any call-back) will execute first 
 * so the two console.log outside of any callback will excecute first
 * 
 * Then since the setTimeout and Promise are both executing at the same time -
 * timeout is executed at 0 seconds, and promise is immediately resolved. 
 * 
 * The promise will be executed before the timeout because it is in the microtasks queue
 * while the timeout call back is in the callback queue.
 * 
 * Microtask queue has priority over the callback queue.
 * 
 * Test start 
 * Test end 
 * Resolved promise 1 
 * 0 sec timer
 * 
 * If the microtask is taking a long time to run, then the timeout will not be executed
 * at 0 seconds and will have to wait. 
 */



console.log('Test start2');
setTimeout(() => console.log('0 sec timer 2'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res))
Promise.resolve('Resolved promise 2').then(res => {
    //stall time by looping over a large number
    //  for(let i = 0; i < 900000; i++){

    //  }
    console.log(res);
})
console.log('Test end2');


/**
 * Building a simple promise
 * 
 * Promise is a special type of object in JS and we can use the contructor to create
 * our own promises.
 */

const lotteryPromise = new Promise(function (resolve, reject) {

    console.log('Lottery draw is happening');
    setTimeout(function () {
        /**
         * This promise will be marked as fullfilled when we call the resolve function.
         * In this scenario if the number is greater than 0.5 then we can resolve the promise
         * by calling the resolve function.
         * 
         * Into the resolve function we pass the fulfilled value which will later be consumed
         * by the 'then' method. 
         * 
         * Whatever we pass into the resolve function will be consumed by the then method
         */
        if (Math.random() >= 0.5) {
            resolve('You win $$$$')
        } else {
            /**
             * What we pass into the reject method will be consumed by the catched method
             */
            reject(new Error('You lost your money'));
        }
    }, 2000)
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

/**
 * We usually consume promises and only build promises to wrap old based callback functions
 * into promises. This process called promisifying -- the process of convert callback based 
 * async behavior to promise based. 
 */


// Promisifying setTimeout 
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    })
}

wait(2).then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
}).then(() => console.log('I waited for 1 second'));


//Promisifying the Geolocation API

//call back based
// navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     err => console.error(err)
// );
// console.log('Getting position');

//Promise based
const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // )

        // we can just pass the resolve and reject function as the call back function 
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

getPosition().then(pos => console.log(pos));

const whereAmI2 = function () {
    getPosition()
        .then(pos => {
            const { latitude: lat, longitude: lng } = pos.coords;

            return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        })
        .then(res => {
            if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);

            return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
        })
        .then(res => {
            if (!res.ok) throw new Error(`Country not found (${res.status})`);

            return res.json();
        })
        .then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message} 💥`));
};

whereAmI2();

/**
 * Promise Practice
 */

const wait2 = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    })
}

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function () {
            reject(new Error('Image not found'))
        });
    })
}

let currentImage;

createImage('img/img-1.jpg').then(img => {
    currentImage = img;
    console.log('Image 1 loaded');
    return wait2(2)
}).then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
}).then(() => {
    currentImage = img;
    console.log('Image 2 loaded');
    return wait2(2);
}).then(() => {
    currentImage.style.display = 'none';
}).catch(err => console.log(err));


/**
 * Consuming promises using Async await
 * 
 * async functions will keep running in the background while performing the code
 * inside of it. Then whhen it's done, it automatically returns a promise.
 */

// const whereAmI3 = async function(country) {
//     const pos = await getPosition();
//     const {latitude: lat, longitude: lng}  = pos.coords;
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);
//     /**
//      * await --- await will stop the code execution at this point until the promised
//      * is fulfilled. 
//      * 
//      * Once the promise is resolved, the whole value of the await expression is the resolved
//      * value of the promise.
//      */
//     const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//     const data = await res.json();
//     // console.log(data);
//     renderCountry(data[0]);
// }
// whereAmI3('Canada');
// console.log('First');

/**
 * Error handling with Async await
 */

// try {
//     let y = 1;
//     const x = 2;
//     x = 3; //simulating an error by changing a const value
// } catch(e) {
//     console.log(e.message);
// }


const whereAmI3 = async function (country) {
    try {
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

        if (!resGeo.ok) throw new Error('Problem getting location data');
        const dataGeo = await resGeo.json();
        console.log(dataGeo);
        /**
         * await --- await will stop the code execution at this point until the promised
         * is fulfilled. 
         * 
         * Once the promise is resolved, the whole value of the await expression is the resolved
         * value of the promise.
         */
        const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
        if (!resGeo.ok) throw new Error('Problem getting country data');

        const data = await res.json();
        // console.log(data);
        renderCountry(data[0]);
    } catch (e) {
        console.log(e.message);
        renderError('Caught an error at catch: ' + err.message);
    }
}
whereAmI3('Canada');
console.log('First');

/**
 * Returning values from async
 */

// const city = whereAmI(); //cannot do this because the async function will simplu return a promise and not its value

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
    try {
        const city = await whereAmI3();
    } catch (e) {
        console.log(e.message);
    }
    console.log("Will run once");
})();

/**
 * Running Promises in Parallel
 */

const get3Countries = async function (c1, c2, c3) {
    try {

        // const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`);

        /**
         * In the above code, it's bad practice to wait for each call we are making. 
         * In a situation like this which can be done in parallel, we can use Promise.all
         * which takes in an array of promises and returns a new promise which will run all
         * the promises at the same time.
         * 
         * One caveat is to know if one promise rejects then all promises will result in 
         * a reject.
         * 
         * We can also chain a then method to Promise.all because it returns a promise.
         */
        const data = Promise.all([
            getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
        ]);
        console.log(data);

        console.log(data.map(d => d[0].capital));

    } catch (e) {
        console.error(e);
    }
}

get3Countries('Cuba', 'Brazil', 'Taiwan');

/**
 * More Promise Combinators:
 * 
 * Promise.race -- receives an array of promises and returns a promise. This returned promise
 *          is settled as soon as one of the input promises are settled. Basicalyl the first
 *          settled promise wins the race. These three promises will race against each other. 
 *          
 *          The fullfilment value of this promise is the fullfilment of the winning promise.
 *          At the same time when a promise gets rejected it will win the race by short circuiting
 *          the race. If one promise is rejected they all get rejected.
 * 
 * Promise.allSettled -- It takes an array of promises and will return an array of all settled
 *          promises.
 * 
 * Promise.any -- Very new, and not supported in most browsers. It takes in an array of multiple
 *          promises and will return the first fullfilled promise. It will ignore rejected promises.
 *          It is similar to Promise.race but will ignore rejected promises. 
 */

//Promise Race
(async function () {
    const res = await Promise.race([
        getJSON(`https://restcountries.eu/rest/v2/name/Egypt`),
        getJSON(`https://restcountries.eu/rest/v2/name/Sweden`),
        getJSON(`https://restcountries.eu/rest/v2/name/Argentina`)
    ]);
    console.log(res[0]);
})();

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error('request took too long!'))
        }, s)
    })
}

/**
 * We can pass a timeout which returns a primise into the array of inputs of promise. 
 * If the timeout executes first (meaning 1 second has passed) it will win the race
 * before the fetch from the API. 
 * 
 * The API fetch will have to retrieve the data faster than 1 second to win the race.
 */
Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/Mexico`),
    timeout(1)
])
    .then(res => console.log(res[0]))
    .catch(err => console.log(err))

//Promise.allSettled
Promise.allSettled([
    Promise.resolve('Success'), //just a simple resolved promise
    Promise.reject('Error'),
    Promise.resolve('Another Success')
]).then(res => console.log(res));

Promise.all([
    Promise.resolve('Success'), //just a simple resolved promise
    Promise.reject('Error'),
    Promise.resolve('Another Success')
])
    .then(res => console.log(res))
    .catch(err => console.log(err))

/**
 * Async Practice -- Sum everything
 */




const loadNPause = async function () {
    try {

        //load image 1
        let img = await createImage('img/img-1.jpg');
        console.log('Load image 1:');

        await wait(2);
        img.style.display = 'none';

        //load image 2
        img = await createImage('img/img-2.jpg');
        console.log('Load image 2:');

        await wait(2);
        img.style.display = 'none';

    } catch (e) {
        console.log(e.message);
    }
}

loadNPause();

const loadAll = async function (imgArr) {
    try {
        const imgs = imgArr.map(async img => await createImage(img)); //the async img will return 3 promises
        console.log(imgs);

        const imgsEl = await Promise.all(imgs); //get the img element out of the promises in imgs
        console.log(imgsEl);

        imgsEl.forEach(img => img.classList.add('parallel'));
    } catch (e) {
        console.log(e.message);
    }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']); 


