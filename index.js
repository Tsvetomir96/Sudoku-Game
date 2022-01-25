const sudokuTable = (size) => {
  let sizeArr = new Array(size);

  for (let i = 0; i < size; i++) {
    sizeArr[i] = new Array(size);
  }

  for (let i = 0; i < Math.pow(size, 2); i++) {
    sizeArr[Math.floor(i / size)][i % size] = GAME_DUMMY_DATA.UNASSIGNED;
  }

  return sizeArr;
};

const sudokuCol = (grid, col, value) => {
  for (let row = 0; row < GAME_DUMMY_DATA.TABLE_SIZE; row++) {
    if (grid[row][col] === value) {
      return false;
    }
  }
  return true;
};

const sudokuRow = (grid, row, value) => {
  for (let col = 0; col < GAME_DUMMY_DATA.TABLE_SIZE; col++) {
    if (grid[row[col] === value]) {
      return false;
    }
  }
  return true;
};

const sudokuBox = (grid, boxRow, boxCol, value) => {
  for (let row = 0; row < GAME_DUMMY_DATA.TABLE_BOX; row++) {
    for (let col = 0; col < GAME_DUMMY_DATA.TABLE_BOX; col++) {
      if (grid[row + boxRow][col + boxCol] === value) {
        return false;
      }
    }
  }
  return true;
};

const boardCheck = (grid, row, col, value) => {
  return (
    sudokuCol(grid, col, value) &&
    sudokuRow(grid, row, value) &&
    sudokuBox(grid, row - (row % 3), col - (col % 3), value) &&
    value !== GAME_DUMMY_DATA.UNASSIGNED
  );
};

const emptyCell = (grid, position) => {
  for (let row = 0; row < GAME_DUMMY_DATA.TABLE_SIZE; row++) {
    for (let col = 0; col < GAME_DUMMY_DATA.TABLE_SIZE; col++) {
      if (grid[row][col] === GAME_DUMMY_DATA.UNASSIGNED) {
        position.row = row;
        position.col = col;

        return true;
      }
    }
  }
  return false;
};

const shuffleArray = (arr) => {
  let currentIndex = arr.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    let temp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
};

const sudokuGameCompleted = (grid) => {
  return grid.every((row, i) => {
    return row.every((value, y) => {
      return value !== GAME_DUMMY_DATA.UNASSIGNED;
    });
  });
};

const sudokuCreate = (grid) => {
  let unassignedPossition = {
    row: -1,
    col: -1,
  };

  if (!emptyCell(grid, unassignedPossition)) {
    return true;
  }

  let numberList = shuffleArray([...GAME_DUMMY_DATA.SUDOKU_NUMBERS]);

  let row = unassignedPossition.row;
  let col = unassignedPossition.col;

  numberList.forEach((number, i) => {
    if (boardCheck(grid, row, col, number)) {
      grid[row][col] = number;

      if (sudokuGameCompleted(grid)) {
        return true;
      } else {
        if (sudokuCreate(grid)) {
          return true;
        }
      }

      grid[row][col] = GAME_DUMMY_DATA.UNASSIGNED;
    }
  });

  return sudokuGameCompleted(grid);
};

const sudokuCheck = (grid) => {
  let unassignedPosition = {
    row: -1,
    col: -1,
  };

  if (!emptyCell(grid, unassignedPosition)) {
    return true;
  }
  grid.forEach((row, i) => {
    row.forEach((number, y) => {
      if (boardCheck(grid, i, y, number)) {
        if (sudokuGameCompleted(grid)) {
          return true;
        } else {
          if (sudokuCreate(grid)) {
            return true;
          }
        }
      }
    });
  });
  return sudokuGameCompleted(grid);
};

const random = () => {
  Math.floor(Math.random() * GAME_DUMMY_DATA.TABLE_SIZE);
};

const removeCells = (grid, level) => {
  let reset = [...grid];
  let attemps = level;

  while (attemps > 0) {
    let row = random();
    let col = random();

    while (reset[row][col] === 0) {
      row = random();
      col = random();
    }
    reset[row][col] = GAME_DUMMY_DATA.UNASSIGNED;
    attemps--;
  }
  return reset;
};

const sudokuLevelGenerator = (level) => {
  let game = sudokuTable(GAME_DUMMY_DATA.TABLE_SIZE);
  let gameCheck = sudokuCreate(game);

  if (gameCheck) {
    let question = removeCells(game, level);

    return {
      original: game,
      question: question,
    };
  }
  return;
};
