export default class Board {
  board: string[][];

  constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  getCell(row: number, col: number) {
    return this.board[row][col];
  }

  setCell(row: number, col: number, symbol: string) {
    this.board[row][col] = symbol;
  }

  checkBoard(): string {
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
      if (countX === 3) return "X";
      if (countO === 3) return "O";
    }

    // Check three in a column
    for (let col = 0; col < 3; col++) {
      let countX = 0;
      let countO = 0;
      for (let row = 0; row < 3; row++) {
        if (this.board[row][col] === "X") countX++;
        if (this.board[row][col] === "O") countO++;
      }
      if (countX === 3) return "X";
      if (countO === 3) return "O";
    }

    // Check diagonals
    let countX = 0;
    let countO = 0;
    for (let i = 0; i < 3; i++) {
      if (this.board[i][i] === "X") countX++;
      if (this.board[i][i] === "O") countO++;
    }
    if (countX === 3) return "X";
    if (countO === 3) return "O";

    countX = 0;
    countO = 0;
    for (let i = 0; i < 3; i++) {
      if (this.board[i][2 - i] === "X") countX++;
      if (this.board[i][2 - i] === "O") countO++;
    }
    if (countX === 3) return "X";
    if (countO === 3) return "O";

    if (countEmpty === 0) return "tie";
    return "";
  }
}
