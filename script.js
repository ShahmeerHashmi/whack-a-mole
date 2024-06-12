// Select all the necessary DOM elements
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start-button');

let lastHole;
let timeUp = false;
let score = 0;

// Function to return a random time between a minimum and maximum value
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Function to return a random hole
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Function to make the mole appear and disappear
function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

// Function to start the game
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000); // Game duration is 10 seconds
}

// Function to handle mole click
function bonk(e) {
    if (!e.isTrusted) return; // Only allow real clicks
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

// Add event listeners to the moles and the start button
moles.forEach(mole => mole.addEventListener('click', bonk));
startButton.addEventListener('click', startGame);
