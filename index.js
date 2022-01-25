const newSudokuBoard = (size) => {
  let sizeArr = new Array(size);

  for (let i = 0; i < size; i++) {
    sizeArr[i] = new Array(size);
  }

  for (let i = 0; i < Math.pow(size, 2); i++) {
    sizeArr[Math.floor(i / size)][i % size] = GAME_DUMMY_DATA.UNASSIGNED;
  }

  return sizeArr;
};


const sudokuCol = (table, col, value) => {
  for (let row = 0; row < GAME_DUMMY_DATA.TABLE_SIZE; row++) {
    if (table[row][col] === value) return false;
  }
  return true;
};


const sudokuRow = (table, row, value) => {
  for (let col = 0; col < GAME_DUMMY_DATA.TABLE_SIZE; col++) {
    if (table[row][col] === value) return false;
  }
  return true;
};


const sudokuBox = (table, boxRow, boxCol, value) => {
  for (let row = 0; row < GAME_DUMMY_DATA.TABLE_BOX; row++) {
    for (let col = 0; col < GAME_DUMMY_DATA.TABLE_BOX; col++) {
      if (table[row + boxRow][col + boxCol] === value) return false;
    }
  }
  return true;
};


const sudokuRowColBox = (table, row, col, value) => {
  return (
    sudokuCol(table, col, value) &&
    sudokuRow(table, row, value) &&
    sudokuBox(table, row - (row % 3), col - (col % 3), value) &&
    value !== GAME_DUMMY_DATA.UNASSIGNED
  );
};


const unassignedCell = (table, position) => {
  for (let row = 0; row < GAME_DUMMY_DATA.TABLE_SIZE; row++) {
    for (let col = 0; col < GAME_DUMMY_DATA.TABLE_SIZE; col++) {
      if (table[row][col] === GAME_DUMMY_DATA.UNASSIGNED) {
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


const sudokuBoardCompleted = (table) => {
  return table.every((row, i) => {
    return row.every((value, j) => {
      return value !== GAME_DUMMY_DATA.UNASSIGNED;
    });
  });
};

const sudokuCreate = (table) => {
  let unassignedPosition = {
    row: -1,
    col: -1,
  };

  if (!unassignedCell(table, unassignedPosition)) return true;

  let numberList = shuffleArray([...GAME_DUMMY_DATA.SUDOKU_NUMBERS]);

  let row = unassignedPosition.row;
  let col = unassignedPosition.col;

  numberList.forEach((number, i) => {
    if (sudokuRowColBox(table, row, col, number)) {
      table[row][col] = number;

      if (sudokuBoardCompleted(table)) {
        return true;
      } else {
        if (sudokuCreate(table)) {
          return true;
        }
      }

      table[row][col] = GAME_DUMMY_DATA.UNASSIGNED;
    }
  });

  return sudokuBoardCompleted(table);
};

const sudokuCheck = (table) => {
  let unassignedPosition = {
    row: -1,
    col: -1,
  };

  if (!unassignedCell(table, unassignedPosition)) return true;

  table.forEach((row, i) => {
    row.forEach((number, j) => {
      if (sudokuRowColBox(table, i, j, number)) {
        if (sudokuBoardCompleted(table)) {
          return true;
        } else {
          if (sudokuCreate(table)) {
            return true;
          }
        }
      }
    });
  });

  return sudokuBoardCompleted(table);
};

const random = () => Math.floor(Math.random() * GAME_DUMMY_DATA.TABLE_SIZE);

const removeCells = (table, level) => {
  let reset = [...table];
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


const sudokuNumGenerator = (level) => {
  let sudoku = newSudokuBoard(GAME_DUMMY_DATA.TABLE_SIZE);
  let check = sudokuCreate(sudoku);
  if (check) {
    let question = removeCells(sudoku, level);
    return {
      original: sudoku,
      question: question,
    };
  }
  return undefined;
};
