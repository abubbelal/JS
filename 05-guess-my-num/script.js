'use strict';

let secret = Math.trunc(Math.random() * 20);
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);
    
    console.log(guess);
    
    //If guess value is empty -- output no number
    if(!guess) { //no input
        displayMessage('No Number!');
    } else if(guess === secret) { //player wins

        document.querySelector('.number').textContent = secret; 
        displayMessage('Correct Number!!');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

        if(score > highScore) {

            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }

    } else if (guess !== secret) {

        if(score > 1) {
            
            score -= 1;
            displayMessage(guess > secret ? 'Too high' : 'Too Low');
            document.querySelector('.score').textContent = score;

        } else {

            displayMessage('You lost the game');
            document.querySelector('.score').textContent = 0;
            score = 0;

        }
    } 
});

//Reset the game
document.querySelector('.again').addEventListener('click', function() {
    document.querySelector('.number').textContent = '?';
    score = 20;
    document.querySelector('.score').textContent = score;
    displayMessage('Start guessing...');
    secret = Math.trunc(Math.random() * 20);
    document.querySelector('.guess').value = '';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('body').style.backgroundColor = '#222';

});

