let userScore = 0;
let compScore = 0;
let back = document.querySelector("#back");
const userScore1 = document.querySelector("#userScore");
const compScore1 = document.querySelector("#compScore");
let msg = document.querySelector(".msg");
const choices = document.querySelectorAll(".choice");


back.addEventListener("click" , function() {
    window.history.back()});


const getCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    let idx = Math.floor(Math.random() * 3);
    return options[idx];
}

const drawGame = () => {
    msg.innerText = "It was a Draw";
    msg.style.backgroundColor = "rgb(145, 118, 1)";

}

const playgame = (userChoice) => {
    const compChoice = getCompChoice();

    const showWinner = (userWin) => {
        if (userWin) {
            // winner.innerHTML  = "<h1> You Win </h1>";
            msg.innerText = `You Win!, your ${userChoice} beats ${compChoice}`;
            msg.style.backgroundColor = "green";
            userScore++;
            console.log(userScore);
            userScore1.innerText = userScore;
        } else {
            msg.innerText = `You lose!, ${compChoice} beats your ${userChoice}`;
            msg.style.backgroundColor = "red";
            compScore++;
            compScore1.innerText = compScore;
        }
    }

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin);

    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playgame(userChoice);
    });
});
