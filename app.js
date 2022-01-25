// GAME SCREENS
const startGame = document.querySelector("#start-screen");
const sudokuScreen = document.querySelector("#sudoku-screen");
const cells = document.querySelectorAll(".sudoku-screen_cell");

// GAME VALUES
let levelIndex = 0;
let level = GAME_DUMMY_DATA.LEVEL_POINTS[levelIndex];
let gameSudoku;
let sudokuAnswer;

const gameInfo = () => JSON.parse(localStorage.getItem("game"));

// CELLS FUNCTION FORMATION BUILDING SUDOKU BOARD
const sudokuBoard = () => {
  let cellIndex = 0;

  for (let i = 0; i < Math.pow(GAME_DUMMY_DATA.TABLE_SIZE, 2); i++) {
    let row = Math.floor(i / GAME_DUMMY_DATA.TABLE_SIZE);
    let col = i % GAME_DUMMY_DATA.TABLE_SIZE;

    if (row === 2 || row === 5) {
      cells[cellIndex].style.marginBottom = "1rem";
    }

    if (col === 2 || col === 5) {
      cells[cellIndex].style.marginRight = "1rem";
    }

    cellIndex++;
  }
};

const initSudoku = () => {
  gameSudoku = sudokuLevelGenerator(level);
  sudokuAnswer = [...gameSudoku.question];

  console.table(sudokuAnswer);

  for (let i = 0; i < Math.pow(GAME_DUMMY_DATA.TABLE_SIZE, 2); i++) {
    let row = Math.floor(i / GAME_DUMMY_DATA.TABLE_SIZE);
    let col = i % GAME_DUMMY_DATA.TABLE_SIZE;

    cells[i].setAttribute("data-value", sudokuAnswer.question[row][col]);

    if (sudokuAnswer.question[row][col] !== 0) {
      cells[i].classList.add("fill");
      cells[i].innerHTML = sudokuAnswer.question[row][col];
    }
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
    levelIndex =
      levelIndex + 1 > GAME_DUMMY_DATA.LEVEL_POINTS.length - 1
        ? 0
        : levelIndex + 1;
    level = GAME_DUMMY_DATA.LEVEL_POINTS[levelIndex];
    event.target.innerHTML = GAME_DUMMY_DATA.LEVELS[levelIndex];
  });

document.querySelector("#btn-new").addEventListener("click", () => {
    gameStarted();
    initSudoku();
});

const init = () => {
  const game = gameInfo();
  document.querySelector("#btn-continue").style.display = game
    ? "grid"
    : "none";

  sudokuBoard();
};

init();
