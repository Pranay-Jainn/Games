let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let msgContainer = document.querySelector(".msgContainer");
let newGame = document.querySelector("#newBtn");
let msg = document.querySelector("#msg");
let draw = document.querySelector("#draw");
let back = document.querySelector("#back");

back.addEventListener("click", function () {
    window.history.back()});

let turnO = true;
const undoStack = [];
const redoStack = [];

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Save the current game state
const saveState = () => {
    const state = Array.from(boxes).map((box) => box.innerText);
    undoStack.push({ state, turnO });
    redoStack.length = 0; // Clear redo stack on a new move
};

// Restore a given state
const restoreState = ({ state, turnO: newTurnO }) => {
    boxes.forEach((box, index) => {
        box.innerText = state[index];
        box.disabled = state[index] !== ""; // Disable boxes with moves
    });
    turnO = newTurnO;
    checkWinner();
};

let count = 0; // To track the number of moves

const checkDraw = () => {
    if (count === 9) {
        msg.innerText = "The Match Was a Draw"; // Set the draw message
        msgContainer.classList.remove("hide"); // Show the message container
        boxes.forEach((box) => (box.disabled = true)); // Disable all boxes
        return true; // Return true if it's a draw
    }
    return false; // Return false if the game is not a draw
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Ignore already filled boxes

        saveState(); // Save state before the move


        box.innerText = turnO ? "O" : "X"; // Set the box text
        if (box.innerText === "O") {
            box.style.color = "green";
        } else {
            box.style.color = "#b0413e";
        }
        turnO = !turnO; // Toggle the turn
        box.disabled = true; // Disable the clicked box
        count++; // Increment move count


        // Check for winner first
        checkWinner();

        // Check for draw only if no winner
        if (!msgContainer.classList.contains("hide")) return; // Skip if winner message is shown
        checkDraw();
    });
});

const resetGame = () => {
    turnO = true;
    count = 0; // Reset move count
    undoStack.length = 0; // Clear stacks
    redoStack.length = 0;
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide"); // Hide the message container
};


const checkWinner = () => {
    for (let patterns of winPatterns) {
        const [pos1, pos2, pos3] = patterns;
        let pos1val = boxes[pos1].innerText;
        let pos2val = boxes[pos2].innerText;
        let pos3val = boxes[pos3].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            msg.innerText = `Congratulations, Winner is ${pos1val}`;
            msgContainer.classList.remove("hide");
            boxes.forEach((box) => (box.disabled = true));
            return;
        }
    }
};



const undoMove = () => {
    if (undoStack.length > 0) {
        const currentState = Array.from(boxes).map((box) => box.innerText);
        redoStack.push({ state: currentState, turnO });
        const lastState = undoStack.pop();
        restoreState(lastState);
        count--;
    }
};

const redoMove = () => {
    if (redoStack.length > 0) {
        const currentState = Array.from(boxes).map((box) => box.innerText);
        undoStack.push({ state: currentState, turnO });
        const nextState = redoStack.pop();
        restoreState(nextState);
        count++;
    }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
undo.addEventListener("click", undoMove);
redo.addEventListener("click", redoMove);
