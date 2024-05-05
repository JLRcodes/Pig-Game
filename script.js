'use strict';
'use strict';
// Selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`); // Same but a little bit faster, good when selecting lots of elements
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// Starting conditions
let scores, currentScore, activePlayer, playing; // Declaring the variable outside but assigning it in the function

// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

const init = function () {
  // Initializer function
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // PLaying variable to be able to finsh a game

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

init();

// Switching player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // if active player is 0, becomes 1
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // Not a global variable, because each time we roll we want to generate a new number

    //2. Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Using the hold button
btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1. Add current score to active players score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      diceEl.classList.add(`hidden`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Resetting the Game
btnNew.addEventListener(`click`, init); // Passing function into button
