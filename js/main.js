
/*----- constants -----*/
let CHOICES = {
    0: "rock",
    1: "paper",
    2: "scissors",
    3: "icon"
};

let PHOTO = {
    "rock": "static/Rock.png",
    "paper": "static/Paper.png",
    "scissors": "static/Scissors.png",
    "icon": "static/questionIcon.png",
    "empty": "static/empty.png",
    "playWin": "static/playerWins.png",
    "compWin": "static/compWins.png",
    "tie": "static/tieGame.png",
    0: "static/count3.png",
    1: "static/count2.png",
    2: "static/count1.png"
};

/*----- app's state (variables) -----*/
let javaPlayScore;
let javaCompScore;
let tie;
let compChoice;
let playChoice;
let gameCount;


/*----- cached element references -----*/
const rock_input = document.getElementById("rock");
const paper_input = document.getElementById("paper");
const scissor_input = document.getElementById("scissors");
const playerScore = document.getElementById('playScore');
const compScore = document.getElementById('compScore');
const tieScore = document.getElementById('tieScore');
const playerPic = document.getElementById('playerPic');
const compPic = document.getElementById('compPic');
const resetScores = document.getElementById('resetScore');
const playAgain = document.getElementById('playAgain');
const countClock = document.getElementById('countClock');
const choiceButtons = document.getElementsByClassName("choice");
const audioWin = document.getElementById("win");
const audioLose = document.getElementById("lose");

/*----- event listeners -----*/
rock_input.addEventListener("click", () => game(0));

paper_input.addEventListener("click", () => game(1));

scissor_input.addEventListener("click", () => game(2));

resetScores.addEventListener("click", resetScore);

playAgain.addEventListener("click", init);

/*----- functions -----*/
init();

function init(){
    javaPlayScore = 0;
    javaCompScore = 0;
    tie = 0;
    gameCount = 0;
    countClock.src = PHOTO.empty;
    playAgain.style.visibility = "hidden";
    resetScores.style.visibility = "visible";
    rock_input.style.pointerEvents = "auto";
    paper_input.style.pointerEvents = "auto";
    scissor_input.style.pointerEvents = "auto";

    playChoice = CHOICES[3];
    compChoice = CHOICES[3];
    renderBoard();
}

function resetScore(){
    javaPlayScore = 0;
    javaCompScore = 0;
    tie = 0;
    renderBoard();
};

function renderBoard(){
    playerPic.src = `${PHOTO[playChoice]}`;
    compPic.src = `${PHOTO[compChoice]}`;
    playerScore.innerHTML = `${javaPlayScore}`;
    compScore.innerHTML = `${javaCompScore}`;
    tieScore.innerHTML = `${tie}`;
    return;
}


function WIN() {
    javaPlayScore += 1;
    audioWin.play();
    countClock.src = PHOTO.playWin;
    playerPic.style.outline = "dashed 5px rgb(255, 76, 22)";
    playerPic.style.outlineOffset = "10px";
    renderBoard();
}


function LOSE() {
    javaCompScore += 1;
    audioLose.play();
    countClock.src = PHOTO.compWin;
    playerPic.style.outline = "none";
    compPic.style.outline = "dashed 5px rgb(255, 76, 22)";
    compPic.style.outlineOffset = "10px";
    renderBoard();
}

function TIE() {
    tie += 1;
    countClock.src = PHOTO.tie
    playerPic.style.outline = "none";
    compPic.style.outline = "none";
    countClock.style.outline = "dashed 5px rgb(255, 76, 22)";
    countClock.style.outlineOffset = "10px";
    renderBoard();
}

function computerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    return CHOICES[randomNumber];
}


function game(num) {
    playerPic.style.outline = "none";
    compPic.style.outline = "none";
    countClock.style.outline = "none";
    gameCount += 1;
    if (gameCount === 10) gameEnd();
    compChoice = computerChoice();
    playChoice = CHOICES[num];
    winLogic();
}

function winLogic() {

    if (playChoice === compChoice) return TIE();

    if (playChoice === "rock") {
        if (compChoice === "scissors") WIN();
        else LOSE();
    };

    if (playChoice === "paper") {
        if (compChoice === "rock") WIN();
        else LOSE()
    };

    if (playChoice === "scissors") {
        if (compChoice === "paper") WIN()
        else LOSE()
    };
}

function gameEnd() {
    rock_input.style.pointerEvents = "none";
    paper_input.style.pointerEvents = "none";
    scissor_input.style.pointerEvents = "none";
    playAgain.style.visibility = "visible";
    resetScores.style.visibility = "hidden";
};

