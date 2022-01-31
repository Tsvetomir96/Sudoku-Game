// SIMPLE DUMMY DATA
const GAME_DUMMY_DATA = {
  UNASSIGNED: 0,
  TABLE_SIZE: 9,
  TABLE_BOX: 3,
  SUDOKU_NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  LEVELS: ["Easy", "Medium", "Hard"],
  LEVEL_POINTS: [2, 38, 47],
};

// GAME SCREENS & CONTROLLERS
const startGame = document.querySelector("#start-screen");
const sudokuScreen = document.querySelector("#sudoku-screen");
const cells = document.querySelectorAll(".sudoku-screen_cell");
const gameControllers = document.querySelectorAll(".btn-number");
const resultScreen = document.querySelector("#result-screen");

// GAME VALUES
let levelIndex = 0;
let level = GAME_DUMMY_DATA.LEVEL_POINTS[levelIndex];
let gameSudoku;
let sudokuAnswer;
let selectedCell = -1;

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

// Clear the sudoku board.
const sudokuBoardClear = () => {
  for (let i = 0; i < Math.pow(GAME_DUMMY_DATA.TABLE_SIZE, 2); i++) {
    cells[i].innerHTML = "";
    cells[i].classList.remove("fill");
    cells[i].classList.remove("select");
  }
};

const initSudoku = () => {
  sudokuBoardClear();
  resetCell();

  // Generating the sudoku puzzle.
  gameSudoku = sudokuNumGenerator(level);
  sudokuAnswer = [...gameSudoku.question];

  saveGameData();

  // Show the sudoku to the SPAN elements.
  for (let i = 0; i < Math.pow(GAME_DUMMY_DATA.TABLE_SIZE, 2); i++) {
    let row = Math.floor(i / GAME_DUMMY_DATA.TABLE_SIZE);
    let col = i % GAME_DUMMY_DATA.TABLE_SIZE;

    cells[i].setAttribute("data-value", gameSudoku.question[row][col]);

    if (gameSudoku.question[row][col] !== 0) {
      cells[i].classList.add("fill");
      cells[i].innerHTML = gameSudoku.question[row][col];
    }
  }
};

const clickedCell = (index) => {
  let row = Math.floor(index / GAME_DUMMY_DATA.TABLE_SIZE);
  let col = index % GAME_DUMMY_DATA.TABLE_SIZE;

  let boxStartRow = row - (row % 3);
  let boxStartCol = col - (col % 3);

  for (let i = 0; i < GAME_DUMMY_DATA.TABLE_BOX; i++) {
    for (let j = 0; j < GAME_DUMMY_DATA.TABLE_BOX; j++) {
      let cell = cells[9 * (boxStartRow + i) + (boxStartCol + j)];
      cell.classList.add("hover");
    }
  }
};

const resetCell = () => {
  cells.forEach((event) => event.classList.remove("hover"));
};

const saveGameData = () => {
  let game = {
    level: levelIndex,
    gameSudoku: {
      original: gameSudoku.original,
      question: gameSudoku.question,
      answer: sudokuAnswer,
    },
  };
  localStorage.setItem("game", JSON.stringify(game));
};

const removeGame = () => {
  localStorage.removeItem("game");
};

const gameWin = () => {
  sudokuCheck(sudokuAnswer);
};

const result = () => {
  resultScreen.classList.add("active");
};

const addNumberToBoard = () => {
  gameControllers.forEach((event, index) => {
    event.addEventListener("click", () => {
      if (!cells[selectedCell].classList.contains("fill")) {
        cells[selectedCell].innerHTML = index + 1;
        cells[selectedCell].setAttribute("data-value", index + 1);

        let row = Math.floor(selectedCell / GAME_DUMMY_DATA.TABLE_SIZE);
        let col = selectedCell % GAME_DUMMY_DATA.TABLE_SIZE;
        sudokuAnswer[row][col] = index + 1;

        saveGameData();

        if (gameWin()) {
          removeGame();
          result();
        }
      }
    });
  });
};

const cellEvent = () => {
  cells.forEach((event, index) => {
    event.addEventListener("click", () => {
      if (!event.classList.contains("fill")) {
        cells.forEach((event) => event.classList.remove("select"));

        selectedCell = index;
        event.classList.add("select");

        resetCell();
        clickedCell(index);
      }
    });
  });
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
  initSudoku();
  gameStarted();
});

document.querySelector("#btn-reset").addEventListener("click", () => {
  removeGame();
  sudokuScreen.classList.remove("active");
  startGame.classList.add("active");
});

document.querySelector("#btn-delete").addEventListener("click", () => {
  cells[selectedCell].innerHTML = "";
  cells[selectedCell].setAttribute("data-value", 0);

  let row = Math.floor(selectedCell / GAME_DUMMY_DATA.TABLE_SIZE);
  let col = selectedCell % GAME_DUMMY_DATA.TABLE_SIZE;
  sudokuAnswer[row][col] = 0;
});

const init = () => {
  sudokuBoard();
  cellEvent();
  addNumberToBoard();
};

init();
