'use strict';

const player0 = document.querySelector(`.player--0`)
const player1 = document.querySelector(`.player--1`)
const totalScoresEl = document.querySelector(`.score`);
const currentScores = document.querySelectorAll(`.current-score`);
let totalScoreP1 = document.querySelector(`#score--0`);
let totalScoreP2 = document.querySelector(`#score--1`);
let currentScoreP1 = document.querySelector(`#current--0`);
let currentScoreP2 = document.querySelector(`#current--1`);
let dice = document.querySelector(`.dice`);

const totalScores = [0, 0]
let P1TS = 0
let P2TS = 0
let currentScore = 0
let side = 1
let activePlayer = 0;
let playing = true;



const makeRandomNumber = function () {
    let randomNum = Math.floor(Math.random() * 6) + 1
    return randomNum;
}

const newGame = function () {

    playing = true;

    dice.classList.add(`hidden`);

    for (let i = 0; i < totalScores.length; i++) {
        totalScores[i] = 0;
    }
    P1TS = 0
    P2TS = 0
    currentScore = 0
    side = 1
    activePlayer = 0;

    currentScoreP1.textContent = 0
    totalScoreP1.textContent = 0
    currentScoreP2.textContent = 0
    totalScoreP2.textContent = 0
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--winner`);
    document.querySelector(`.player--${activePlayer}`).classList.add(`player--active`);
    
}

const switchSides = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    player0.classList.toggle(`player--active`);
    player1.classList.toggle(`player--active`);
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0

    }



}

const rollDice = function () {
    if(playing){
        let rand = makeRandomNumber();
        dice.src = `dice-${rand}.png`
        dice.classList.remove(`hidden`)

        if (rand === 1) {
            switchSides();

        } else {
            currentScore += rand
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
    }

}
// const rollDice = function () {
//     let rand = makeRandomNumber();
//     dice.src =`dice-${rand}.png`
//     dice.classList.remove(`hidden`)

//     switch (side) {
//         case 1:
//             if (rand === 1) {
//                 currentScore = 0;
//                 currentScoreP1.textContent = 0;
//                 side = side * (-1);

//             } else {
//                 currentScore += rand
//                 currentScoreP1.textContent = currentScore
//             }
//             break;
//         case -1:
//             if (rand === 1) {
//                 currentScore = 0;
//                 currentScoreP2.textContent = 0;
//                 side = side * (-1);

//             } else {
//                 currentScore += rand
//                 currentScoreP2.textContent = currentScore
//             }
//             break;
//     }

// }

const holdScore = function () {
    if(playing){
        totalScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

        if (totalScores[activePlayer] >= 100) {

            dice.classList.add(`hidden`)
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);


        } else {
            switchSides();
        }
    }
}

// const holdScore = function () {
//     switch (side) {
//         case 1:
//             if (P1TS < 100) {
//                 P1TS += currentScore
//                 totalScoreP1.textContent = P1TS
//                 currentScore = 0
//                 currentScoreP1.textContent = 0
//                 side = side * (-1);
//             } else {
//                 // tagir style

//             }
//             break
//         case -1:
//             if (P2TS < 100) {
//                 P2TS += currentScore
//                 totalScoreP2.textContent = P2TS
//                 currentScore = 0;
//                 currentScoreP2.textContent = 0;
//                 side = side * (-1);

//             } else {
//                 // tagir style

//             }
//             break
//     }
// }

newGame()
document.querySelector(`.btn--roll`).addEventListener(`click`, rollDice);
document.querySelector(`.btn--hold`).addEventListener(`click`, holdScore);
document.querySelector(`.btn--new`).addEventListener(`click`, newGame)
