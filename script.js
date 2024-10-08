const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const newGameButton = document.getElementById("newGameButton");
const resetButton = document.getElementById("resetButton");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let playerXScore = 0;
let playerOScore = 0;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick() {
  const index = this.getAttribute("data-index");

  if (!isGameActive || board[index] !== "") {
    return;
  }

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  checkForWinner();

  if (isGameActive) { 
    switchPlayer();
  }
}

// Switch the current player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if there's a winner
function checkForWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const winCondition = winConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      highlightWinningCells(winCondition);
      updateScore();
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
  }
}

function highlightWinningCells(winCondition) {
  winCondition.forEach(index => {
    cells[index].classList.add("winning");
  });
}

function updateScore() {
  if (currentPlayer === "X") {
    playerXScore++;
    scoreX.textContent = playerXScore;
  } else {
    playerOScore++;
    scoreO.textContent = playerOScore;
  }
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning");
  });
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
}

newGameButton.addEventListener("click", () => {
  resetBoard();
});

resetButton.addEventListener("click", () => {
  resetBoard();
  playerXScore = 0;
  playerOScore = 0;
  scoreX.textContent = playerXScore;
  scoreO.textContent = playerOScore;
});
