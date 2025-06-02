const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if ([...cells].every(cell => cell.textContent !== "")) {
    statusText.textContent = "Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
  }
}

function checkWin(player) {
  return winningCombinations.some(combo => {
    return combo.every(index => cells[index].textContent === player);
  });
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
  currentPlayer = "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
  gameActive = true;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

// Initialize status
statusText.textContent = `${currentPlayer}'s Turn`;
