class Board {
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

const message = document.getElementById("message")!;
const table = document.querySelector("table")!;
const cells = document.querySelectorAll("th");
const restartBtn = document.getElementById("restart-btn")!;
const timesIcon = `<i class="fas fa-times times"></i>`;
const circleIcon = `<i class="far fa-circle circle"></i>`;

let currIcon = timesIcon;
let gameBoard = new Board();
let winner = "";

window.addEventListener("DOMContentLoaded", () => {
  cells.forEach((cellHeader) => {
    const cellRow = cellHeader.parentElement!;
    const iconDiv = cellHeader.querySelector(".icon-container") as HTMLElement;

    cellHeader.addEventListener("click", () => {
      if (
        gameBoard.getCell(+cellRow.dataset.id!, +iconDiv.dataset.id!) === ""
      ) {
        updateBoardBackend(+cellRow.dataset.id!, +iconDiv.dataset.id!);
        updateBoardFrontend(iconDiv);
      }
    });

    // For showing X and O's on hover of empty cell
    cellHeader.addEventListener("mouseenter", () => {
      if (iconDiv.innerHTML === "") {
        iconDiv.innerHTML = currIcon;
      }
    });

    cellHeader.addEventListener("mouseleave", () => {
      if (
        gameBoard.getCell(+cellRow.dataset.id!, +iconDiv.dataset.id!) === ""
      ) {
        iconDiv.innerHTML = "";
      }
    });
  });

  restartBtn.addEventListener("click", () => {
    clearBoard();
  });
});

// If cell is unoccupied, update board's array state. Check if there is a winner from board state.
const updateBoardBackend = (row: number, col: number) => {
  if (currIcon === timesIcon) gameBoard.setCell(row, col, "X");
  else gameBoard.setCell(row, col, "O");
  winner = gameBoard.checkBoard();
};

// If cell is unoccupied, place X or O icon in HTML. Also sets message of who won if there is a winner
const updateBoardFrontend = (iconDiv: HTMLElement) => {
  iconDiv.innerHTML = currIcon;
  if (currIcon === timesIcon) currIcon = circleIcon;
  else currIcon = timesIcon;
  if (winner) {
    if (winner === "tie") message.textContent = "It's a tie!";
    else message.textContent = winner + " wins!";
    // https://stackoverflow.com/questions/1755815/disable-all-click-events-on-page-javascript/48035251
    // Was not able to remove event listeners with parameters, so used this instead
    table.addEventListener("click", preventTableClicks, true); // Disable clicking on table after win
    table.addEventListener("mouseenter", preventTableClicks, true);
  }
};

const clearBoard = () => {
  cells.forEach((cellHeader) => {
    // Reset variables
    message.textContent = "";
    gameBoard = new Board();
    currIcon = timesIcon;

    // Clear board visually
    const iconDiv = cellHeader.querySelector(".icon-container") as HTMLElement;
    iconDiv.innerHTML = "";

    table.removeEventListener("click", preventTableClicks, true);
    table.removeEventListener("mouseenter", preventTableClicks, true);
  });
};

const preventTableClicks = (event: Event) => {
  event.stopPropagation();
  event.preventDefault();
};
