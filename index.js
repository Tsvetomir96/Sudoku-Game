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

const sudokuRow = (table, row, value) => {
  for (let col = 0; col < GAME_DUMMY_DATA.TABLE_SIZE; col++) {
    if (table[row[col] === value]) {
      return false;
    }
    return true;
  }
};

const sudokuCol = (table, col, value) => {
  for (let row = 0; row < GAME_DUMMY_DATA.TABLE_SIZE; row++) {
    if (table[row][col] === value) {
      return false;
    }
    return true;
  }
};

const sudokuBox = (table, boxRow, boxCol, value) => {
  for (let row = 0; row < GAME_DUMMY_DATA.TABLE_BOX; row++) {
    for (let col = 0; col < GAME_DUMMY_DATA.TABLE_BOX; col++) {
      if (table[row + boxRow][col + boxCol] === value) {
        return false;
      }
    }
  }
  return true;
};

const boardCheck = (table, row, col, value) => {
  return (
    sudokuCol(table, col, value) &&
    sudokuRow(table, row, value) &&
    sudokuBox(table, row - (row % 3), col - (col % 3), value) &&
    value !== GAME_DUMMY_DATA.UNASSIGNED
  );
};

const emptyCell = (table, position) => {
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

const sudokuGameComplete = () => {
  return table.every((row, i) => {
    return row.every((value, y) => {
      return value !== GAME_DUMMY_DATA.UNASSIGNED;
    });
  });
};
