'use strict';

// Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--1');
const player1El = document.querySelector('.player--0');
const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const rollBtn = document.querySelector('.btn--roll');

// Defining empty variables with commas
let scores, currentScore, activePlayer, playing;

const initializeGame = function () {
  // STORE THE SCORES THAT ACCUMULATE IN AN ARRAY
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // Hide the dice
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initializeGame();

// switch to next player
// first set active player to zero
// if the active player is zero then the new active player should be 1, and else, it should be zero
// toggle()  will add the class if it is there, if it isn't, it will remove the class
// the goal is to have the white background toggled between the active player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
rollBtn.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.classList.remove('hidden');
    // Dynamically load the matching image to the dice roll display
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      // select the score element dynamically based on which is the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. add currentScore to activePlayer's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    // Replacing 0 or 1 here dynamically: So, when it is player 0 it will be current--0; when it is player 1 it will be current--1
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if activePlayer's score is >= 100, if so finish the game, else switch to the next player
    if (scores[activePlayer] >= 100) {
      // finish game
      playing = false;
      diceEl.classList.add('hidden');
      // when game is finished, assign a player winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// Reset the game
newBtn.addEventListener('click', initializeGame);
