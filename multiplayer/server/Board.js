module.exports = class Board {
  board;
  winner = "";
  turn = "";

  constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.turn = "X";
  }

  getCell(row, col) {
    return this.board[row][col];
  }

  // Set cell if it is valid, returns if cell was set
  setCell(row, col, icon) {
    if (this.winner) return false; // Already have winner
    if (
      // prettier-ignore
      row >= 0 && row < 3 &&
      col >= 0 && col < 3 &&
      this.board[row][col] === ""
    ) {
      if (this.turn === "X" && icon === "X") {
        this.board[row][col] = icon;
        this.turn = "O";
      }
      if (this.turn === "O" && icon === "O") {
        this.board[row][col] = icon;
        this.turn = "X";
      }
      return true;
    }
    return false;
  }

  // Check board to see if there's a winner or tie
  checkBoard() {
    // Check three in a row and ties
    let countEmpty = 0;
    for (let row = 0; row < 3; row++) {
      let countX = 0;
      let countO = 0;
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === "X") countX++;
        if (this.board[row][col] === "O") countO++;
        if (this.board[row][col] === "") countEmpty++;
      }
      if (countX === 3) this.winner = "X wins!";
      if (countO === 3) this.winner = "O wins!";
    }

    // Check three in a column
    for (let col = 0; col < 3; col++) {
      let countX = 0;
      let countO = 0;
      for (let row = 0; row < 3; row++) {
        if (this.board[row][col] === "X") countX++;
        if (this.board[row][col] === "O") countO++;
      }
      if (countX === 3) this.winner = "X wins!";
      if (countO === 3) this.winner = "O wins!";
    }

    // Check diagonals
    let countX = 0;
    let countO = 0;
    for (let i = 0; i < 3; i++) {
      if (this.board[i][i] === "X") countX++;
      if (this.board[i][i] === "O") countO++;
    }
    if (countX === 3) this.winner = "X wins!";
    if (countO === 3) this.winner = "O wins!";

    countX = 0;
    countO = 0;
    for (let i = 0; i < 3; i++) {
      if (this.board[i][2 - i] === "X") countX++;
      if (this.board[i][2 - i] === "O") countO++;
    }
    if (countX === 3) this.winner = "X wins!";
    if (countO === 3) this.winner = "O wins!";

    if (countEmpty === 0) this.winner = "It's a tie!";
  }
};
