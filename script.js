'use strict';

// sellecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// starting conditions and variables
let scores, currentScore, currentPlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  currentPlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
};

init();
const switchPlayer = function () {
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 1 ? 0 : 1;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (playing) {
    // generating new dice
    const dice = Math.trunc(Math.random() * 6 + 1);
    // displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // checking if the dice is different than 1
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', () => {
  if (playing) {
    // add the currentscore to the active's player score
    scores[currentPlayer] += currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    // check if the player have >=100
    if (scores[currentPlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    }
    // finish the game
    //   switch the player
    switchPlayer();
  }
});
btnNewGame.addEventListener('click', init);
