'use strict';

// Selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting conditions


const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore;
let activePlayer;
let scores;
let playing;

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = (activePlayer === 0) ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

const init = function () {
    score0.textContent = 0;
    score1.textContent = 0;
    diceEl.classList.add('hidden');
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;
    current0.textContent = 0;
    current1.textContent = 0;
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    playing = true;

}

init();

btnRoll.addEventListener('click', function () {
    if (playing) {

        // 1. Generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. display dice
        diceEl.classList.remove('hidden');
        console.log(dice);
        diceEl.src = `dice-${dice}.png`;

        // 3. check if rolled 1: if true, switch player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

        } else {
            // switch to active player
            // document.querySelector(`#current--${activePlayer}`).textContent = 0;
            // activePlayer = (activePlayer === 0) ? 1 : 0;
            // currentScore = 0;
            // player0.classList.toggle('player--active');
            // player1.classList.toggle('player--active');

            switchPlayer();
        }
    }

})

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. add current score to active player's score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. check if score is >= 100
        if (scores[activePlayer] >= 100) {
            //finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            //switch to next player
            switchPlayer();
        }
    }
});



// btnNew.addEventListener('click', function () {
//     init();
// });

btnNew.addEventListener('click', init);