let userScore = 0;
let CPUscore = 0;
let drawScore = 0;

/* initializing variables */
const choices = document.querySelectorAll(".choice-btn");
const message = document.querySelector('.game-title');
const reset = document.querySelector('.reset-btn');
const userCount = document.querySelector('.score-won-txt');
const computerCount = document.querySelector('.score-lost-txt');
const drawCount = document.querySelector('.score-draw-txt');

const userEmoji = document.querySelector('.player-choice-txt');
const CPUemoji = document.querySelector('.CPU-choice-txt');

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        choices.forEach((button) => {button.style.pointerEvents = 'none'});
        message.textContent = "Playing....";
        userEmoji.textContent = "✊";
        CPUemoji.textContent = "✊";

        const userChoice = choice.value;        
        userEmoji.classList.add('user-emoji-animation');
        CPUemoji.classList.add('CPU-emoji-animation');

        setTimeout(() => {
            userEmoji.textContent = setEmoji[userChoice];
            playGame(userChoice);
            choices.forEach((button) => button.style.pointerEvents = 'auto');

            userEmoji.classList.remove('user-emoji-animation');
            CPUemoji.classList.remove('CPU-emoji-animation');
        }, 2000);        
    })
});

// generate computer random choice
function genCpuChoice() {
    const options = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}

const setEmoji = {
    rock: "✊",
    paper: "✋",
    scissor: "✌️"
}

function playGame(user) {
    const computer = genCpuChoice();
    CPUemoji.textContent = setEmoji[computer];

    if (user === computer) {
        //draw
        drawScore++;
        drawCount.innerHTML = drawScore;
        drawGame();

    } else {
        let winner = true;
        if(user === 'rock') {
            // paper or scissor
            winner = computer === 'paper' ? false : true;
        } else if(user === 'paper') {
            // rock or scissor
            winner = computer === 'scissor' ? false : true;
        } else {
            // rock or paper
            winner = computer === 'rock' ? false : true;
        }
        isWinner(winner);
    }
}

function drawGame() {
    message.textContent = "Game Draw!";
}

// who won the game
function isWinner(user) {
    if (user) {
        userScore++;    // upadating by 1 continuously
        userCount.innerHTML = userScore;
        message.textContent = "You Won!";

    } else {
        CPUscore++;    // upadating by 1 continuously
        computerCount.innerHTML = CPUscore;
        message.textContent = "You Lose!";
    }
}

// reset the game
reset.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    userScore = 0;
    CPUscore = 0;
    drawScore = 0;

    userCount.innerHTML = userScore;
    userEmoji.innerHTML = setEmoji["rock"];

    computerCount.innerHTML = CPUscore;
    CPUemoji.innerHTML = setEmoji["rock"];

    drawCount.innerHTML = drawScore;
    message.textContent = "Let's Play!";
}