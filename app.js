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
const startGame = document.querySelector("#screen-start_game");

// GAME VALUES
let levels = 0;
let level = GAME_DUMMY_DATA.LEVEL_POINTS[levels];

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
  alert(`${level}`);
});

const gameInfo = () => JSON.parse(localStorage.getItem("game"));

const init = () => {
  const game = gameInfo();
  document.querySelector("#btn-continue").style.display = game
    ? "grid"
    : "none";
};

init();
