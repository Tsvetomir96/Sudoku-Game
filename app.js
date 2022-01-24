// SIMPLE DUMMY DATA
const GAME_DUMMY_DATA = {
  UNASSIGNED: 0,
  TABLE_SIZE: 9,
  TABLE_BOX: 3,
  SUDOKU_NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  LEVELS: ["Easy", "Medium", "Hard"],
  LEVEL_POINTS: [29, 38, 47],
};

// GAME SCREENS
const startGame = document.querySelector("#start-screen");
const sudokuScreen = document.querySelector("#sudoku-screen");

// GAME VALUES
let levels = 0;
let level = GAME_DUMMY_DATA.LEVEL_POINTS[levels];
const cells = document.querySelectorAll(".sudoku-screen_cell");

const gameInfo = () => JSON.parse(localStorage.getItem("game"));

// CELLS FUNCTION FORMATION BUILDING SUDOKU BOARD
const sudokuBoard = () => {
  let cellIndex = 0;

  for (let i = 0; i < Math.pow(GAME_DUMMY_DATA.TABLE_SIZE, 2); i++) {
    let col = i % GAME_DUMMY_DATA.TABLE_SIZE;
    let row = Math.floor(i / GAME_DUMMY_DATA.TABLE_SIZE);

    if (row === 2 || row === 5) {
      cells[cellIndex].style.marginBottom = "1rem";
    }

    if (col === 2 || col === 5) {
      cells[cellIndex].style.marginRight = "1rem";
    }

    cellIndex++;
  }
};

const gameStarted = () => {
    startGame.classList.remove("active");
    sudokuScreen.classList.add("active");
};

// CHANGING GAME DIFFICULTIES BY PRESSING A BUTTON
document
  .querySelector("#btn-difficulties")
  .addEventListener("click", (event) => {
    levels =
      levels + 1 > GAME_DUMMY_DATA.LEVEL_POINTS.length - 1 ? 0 : levels + 1;
    level = GAME_DUMMY_DATA.LEVEL_POINTS[levels];
    event.target.innerHTML = GAME_DUMMY_DATA.LEVELS[levels];
  });

document.querySelector("#btn-new").addEventListener("click", () => {
  gameStarted();
});

const init = () => {
  const game = gameInfo();
  document.querySelector("#btn-continue").style.display = game
    ? "grid"
    : "none";

  sudokuBoard();
};

init();
