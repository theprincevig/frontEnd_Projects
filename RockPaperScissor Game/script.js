let userScore = 0;
let computerScore = 0;

/* initializing variables */
const choices = document.querySelectorAll(".choice");
const message = document.getElementById('message');
const reset = document.querySelector('.reset-game');
const userCount = document.getElementById('user-score');
const computerCount = document.getElementById('computer-score');

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('id');
        playGame(userChoice);
    })
});

// generate computer random choice
const genComputerChoice = function() {
    const options = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}

const playGame = function(user) {
    const computer = genComputerChoice();

    if (user === computer) {
        //draw
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

message.style.display = 'none';

const drawGame = function() {
    message.textContent = "Game was Draw, Try Again!!";
    message.style.display = '';
}

// who won the game
const isWinner = function(user) {
    if (user) {
        userScore++;    // upadating by 1 continuously
        userCount.innerHTML = userScore;
        message.textContent = "You Won the Game!!";
        message.style.display = '';

    } else {
        computerScore++;    // upadating by 1 continuously
        computerCount.innerHTML = computerScore;
        message.textContent = "You Lose the Game!!";
        message.style.display = '';
    }
}

// reset the game
reset.addEventListener('click', () => {
    resetGame();
});

const resetGame = function() {
    userScore = 0;
    computerScore = 0;
    userCount.innerHTML = userScore;
    computerCount.innerHTML = computerScore;
    message.textContent = '';
    message.style.display = 'none';
}