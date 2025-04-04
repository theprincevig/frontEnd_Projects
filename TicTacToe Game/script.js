const boxes = document.querySelectorAll('.box');

const newGame = document.getElementById('new');
const reset = document.getElementById('reset');

const winner = document.querySelector('.isWinner');
const message = document.querySelector('.message');

// player -> X vs player -> O
let turnX = false;

const winPatterns = [
    // horizontally
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertically
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonally
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach(function(box) {
    box.addEventListener('click', () => {
        if (!turnX) {
            box.textContent = "X";
            turnX = true;

        } else {
            box.textContent = "O";
            turnX = false;
        }

        isWinner();
    })
});

const disabled = function() {
    for (const box of boxes) {
        box.disabled = true;
    }
}

const cleared = function() {
    for (const box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

const resetGame = function() {
    turnX = false;
    winner.classList.add("hide");
    cleared();
}

reset.addEventListener('click', resetGame);
newGame.addEventListener('click', resetGame);

const isWinner = function() {
    for (const pattern of winPatterns) {
        const boxOne = boxes[pattern[0]].textContent;              
        const boxTwo = boxes[pattern[1]].textContent;              
        const boxThree = boxes[pattern[2]].textContent;    
        
        if (boxOne != '' && boxTwo != '' && boxThree != '') {
            if(boxOne === boxTwo && boxTwo === boxThree) {
                displayWinner(boxOne);
                return;
            }
        }
    }
    // check if all boxes are filled
    if([...boxes].every(box => box.textContent !== "")) {
        GameOver();
        return;
    }
}

const displayWinner = function(name) {
    message.innerHTML = `Congratulations!! Winner is ${name}`;
    winner.classList.remove("hide");
    disabled();
}

const GameOver = function() {
    message.innerHTML = `Game Over!! No one is the winner.`;
    winner.classList.remove("hide");
    disabled();
}