const computerHands = document.querySelectorAll(".cpu");
const playerHands = document.querySelectorAll(".player");
const startGameBtn = document.querySelector(".start");
const resetGameBtn = document.querySelector(".restart");
const roundInfo = document.querySelector(".round-info");
const results = document.querySelector(".results");
const playerScoreScreen = document.querySelector(".player-score");
const computerScoreScreen = document.querySelector(".computer-score");

let playerScore = 0;
let computerScore = 0;
// let gameFlag = true;
// chooses a random hand gesture for the computer
const computerPlay = function () {
  const computerSelection = Math.floor(Math.random() * 3);
  computerHands[computerSelection].classList.toggle("hidden");
  return computerSelection;
};

// waits for the player to choose a hand gesture and call for the round winner
const playerPlay = function () {
  playerHands.forEach((hand) => {
    hand.addEventListener("click", function () {
      const playerSelection = +hand.id;
      // hide not chosen gestures
      playerHands.forEach((val) => {
        if (val.id != playerSelection) val.classList.toggle("hidden");
      });
      // see who won the round
      roundWinner(playerSelection);
      setTimeout(() => checkWinner(), 2005);
    });
  });
};

const roundWinner = function (playerHand) {
  const computerHand = computerPlay();
  switch (playerHand) {
    // if player chose rock
    case 0:
      if (computerHand === 0) {
        roundInfo.textContent = "Rock VS Rock";
        results.textContent = "It's a Tie!";
        setTimeout(() => resetRound(), 2000);
        break;
      } else if (computerHand === 1) {
        roundInfo.textContent = "Rock VS Paper";
        results.textContent = "Computer won this round!";
        computerScore++;
        computerScoreScreen.textContent = computerScore;
        setTimeout(() => resetRound(), 2000);
        break;
      } else roundInfo.textContent = "Rock VS Scissors";
      results.textContent = "Player won this round!";
      playerScore++;
      playerScoreScreen.textContent = playerScore;
      setTimeout(() => resetRound(), 2000);
      break;
    // if player chose paper
    case 1:
      if (computerHand === 0) {
        roundInfo.textContent = "Paper VS Rock";
        results.textContent = "Player won this round!";
        playerScore++;
        playerScoreScreen.textContent = playerScore;
        setTimeout(() => resetRound(), 2000);
        break;
      } else if (computerHand === 1) {
        roundInfo.textContent = "Paper VS Paper";
        results.textContent = "It's a Tie !";
        setTimeout(() => resetRound(), 2000);
        break;
      } else roundInfo.textContent = "Paper VS Scissors";
      results.textContent = "Computer won this round!";
      computerScore++;
      computerScoreScreen.textContent = computerScore;
      setTimeout(() => resetRound(), 2000);
      break;
    // if player chose scissors
    case 2:
      if (computerHand === 0) {
        roundInfo.textContent = "Scissors VS Rock";
        results.textContent = "Computer won this round!";
        computerScore++;
        computerScoreScreen.textContent = computerScore;
        setTimeout(() => resetRound(), 2000);
        break;
      } else if (computerHand === 1) {
        roundInfo.textContent = "Scissors VS Paper";
        results.textContent = "Player won this round!";
        playerScore++;
        playerScoreScreen.textContent = playerScore;
        setTimeout(() => resetRound(), 2000);
        break;
      } else roundInfo.textContent = "Scissors VS Scissors";
      results.textContent = "It's a Tie !";
      setTimeout(() => resetRound(), 2000);
      break;
  }
};

const resetRound = function () {
  computerHands.forEach((hand) => {
    if (!hand.classList.contains("hidden")) hand.classList.toggle("hidden");
  });
  playerHands.forEach((hand) => {
    if (hand.classList.contains("hidden")) hand.classList.toggle("hidden");
  });
  roundInfo.textContent = "";
  results.textContent = "";
};

const resetGame = function () {
  resetRound();
  playerScore = 0;
  playerScoreScreen.textContent = 0;
  computerScore = 0;
  computerScoreScreen.textContent = 0;
};

const checkWinner = function () {
  if (playerScore === 5) {
    results.textContent = "You Won!🎉";
    playerHands.forEach((hand) => hand.classList.toggle("hidden"));
  } else if (computerScore === 5) {
    results.textContent = "You Lose!👎";
    playerHands.forEach((hand) => hand.classList.toggle("hidden"));
  }
};

const game = function () {
  roundInfo.textContent = "";
  playerPlay();
};
startGameBtn.addEventListener("click", game);
resetGameBtn.addEventListener("click", resetGame);
