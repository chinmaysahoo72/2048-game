const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let board = [];
let score = 0;

/* Initialize Game */

function initGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  score = 0;

  addRandomTile();
  addRandomTile();

  updateBoard();
}

/* Add Random Tile */

function addRandomTile() {
  let emptyCells = [];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) {
        emptyCells.push({ r, c });
      }
    }
  }

  if (emptyCells.length === 0) return;

  const randomCell =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[randomCell.r][randomCell.c] =
    Math.random() < 0.9 ? 2 : 4;
}

/* Draw Board */

function updateBoard() {
  grid.innerHTML = "";

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const cell = document.createElement("div");

      cell.classList.add("cell");

      const value = board[r][c];

      if (value !== 0) {
        cell.textContent = value;
        cell.setAttribute("data-value", value);
      }

      grid.appendChild(cell);
    }
  }

  scoreDisplay.textContent = score;
}

/* Slide Row Left */

function slide(row) {
  row = row.filter(num => num !== 0);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;

      score += row[i];

      row[i + 1] = 0;
    }
  }

  row = row.filter(num => num !== 0);

  while (row.length < 4) {
    row.push(0);
  }

  return row;
}

/* Move Left */

function moveLeft() {
  let oldBoard = JSON.stringify(board);

  for (let r = 0; r < 4; r++) {
    board[r] = slide(board[r]);
  }

  if (oldBoard !== JSON.stringify(board)) {
    addRandomTile();
    updateBoard();
  }
}

/* Move Right */

function moveRight() {
  let oldBoard = JSON.stringify(board);

  for (let r = 0; r < 4; r++) {
    board[r].reverse();
    board[r] = slide(board[r]);
    board[r].reverse();
  }

  if (oldBoard !== JSON.stringify(board)) {
    addRandomTile();
    updateBoard();
  }
}

/* Move Up */

function moveUp() {
  let oldBoard = JSON.stringify(board);

  for (let c = 0; c < 4; c++) {
    let column = [];

    for (let r = 0; r < 4; r++) {
      column.push(board[r][c]);
    }

    column = slide(column);

    for (let r = 0; r < 4; r++) {
      board[r][c] = column[r];
    }
  }

  if (oldBoard !== JSON.stringify(board)) {
    addRandomTile();
    updateBoard();
  }
}

/* Move Down */

function moveDown() {
  let oldBoard = JSON.stringify(board);

  for (let c = 0; c < 4; c++) {
    let column = [];

    for (let r = 0; r < 4; r++) {
      column.push(board[r][c]);
    }

    column.reverse();

    column = slide(column);

    column.reverse();

    for (let r = 0; r < 4; r++) {
      board[r][c] = column[r];
    }
  }

  if (oldBoard !== JSON.stringify(board)) {
    addRandomTile();
    updateBoard();
  }
}

/* Keyboard Controls */

document.addEventListener("keydown", event => {

  switch (event.key) {
    case "ArrowLeft":
      moveLeft();
      break;

    case "ArrowRight":
      moveRight();
      break;

    case "ArrowUp":
      moveUp();
      break;

    case "ArrowDown":
      moveDown();
      break;
  }

  checkGameOver();
});

/* Check Game Over */

function checkGameOver() {

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {

      if (board[r][c] === 0) {
        return;
      }

      if (c < 3 && board[r][c] === board[r][c + 1]) {
        return;
      }

      if (r < 3 && board[r][c] === board[r + 1][c]) {
        return;
      }
    }
  }

  alert("Game Over!");
}

/* Restart Button */

restartBtn.addEventListener("click", initGame);

/* Start Game */

initGame();