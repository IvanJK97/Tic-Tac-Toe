"use strict";
var Board = /** @class */ (function () {
    function Board() {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
    Board.prototype.getCell = function (row, col) {
        return this.board[row][col];
    };
    Board.prototype.setCell = function (row, col, symbol) {
        this.board[row][col] = symbol;
    };
    Board.prototype.checkBoard = function () {
        // Check three in a row and ties
        var countEmpty = 0;
        for (var row = 0; row < 3; row++) {
            var countX_1 = 0;
            var countO_1 = 0;
            for (var col = 0; col < 3; col++) {
                if (this.board[row][col] === "X")
                    countX_1++;
                if (this.board[row][col] === "O")
                    countO_1++;
                if (this.board[row][col] === "")
                    countEmpty++;
            }
            if (countX_1 === 3)
                return "X";
            if (countO_1 === 3)
                return "O";
        }
        // Check three in a column
        for (var col = 0; col < 3; col++) {
            var countX_2 = 0;
            var countO_2 = 0;
            for (var row = 0; row < 3; row++) {
                if (this.board[row][col] === "X")
                    countX_2++;
                if (this.board[row][col] === "O")
                    countO_2++;
            }
            if (countX_2 === 3)
                return "X";
            if (countO_2 === 3)
                return "O";
        }
        // Check diagonals
        var countX = 0;
        var countO = 0;
        for (var i = 0; i < 3; i++) {
            if (this.board[i][i] === "X")
                countX++;
            if (this.board[i][i] === "O")
                countO++;
        }
        if (countX === 3)
            return "X";
        if (countO === 3)
            return "O";
        countX = 0;
        countO = 0;
        for (var i = 0; i < 3; i++) {
            if (this.board[i][2 - i] === "X")
                countX++;
            if (this.board[i][2 - i] === "O")
                countO++;
        }
        if (countX === 3)
            return "X";
        if (countO === 3)
            return "O";
        if (countEmpty === 0)
            return "tie";
        return "";
    };
    return Board;
}());
var message = document.getElementById("message");
var table = document.querySelector("table");
var cells = document.querySelectorAll("th");
var restartBtn = document.getElementById("restart-btn");
var timesIcon = "<i class=\"fas fa-times times\"></i>";
var circleIcon = "<i class=\"far fa-circle circle\"></i>";
var currIcon = timesIcon;
var gameBoard = new Board();
var winner = "";
window.addEventListener("DOMContentLoaded", function () {
    cells.forEach(function (cellHeader) {
        var cellRow = cellHeader.parentElement;
        var iconDiv = cellHeader.querySelector(".icon-container");
        cellHeader.addEventListener("click", function () {
            if (gameBoard.getCell(+cellRow.dataset.id, +iconDiv.dataset.id) === "") {
                updateBoardBackend(+cellRow.dataset.id, +iconDiv.dataset.id);
                updateBoardFrontend(iconDiv);
            }
        });
        // For showing X and O's on hover of empty cell
        cellHeader.addEventListener("mouseenter", function () {
            if (iconDiv.innerHTML === "") {
                iconDiv.innerHTML = currIcon;
            }
        });
        cellHeader.addEventListener("mouseleave", function () {
            if (gameBoard.getCell(+cellRow.dataset.id, +iconDiv.dataset.id) === "") {
                iconDiv.innerHTML = "";
            }
        });
    });
    restartBtn.addEventListener("click", function () {
        clearBoard();
    });
});
// If cell is unoccupied, update board's array state. Check if there is a winner from board state.
var updateBoardBackend = function (row, col) {
    if (currIcon === timesIcon)
        gameBoard.setCell(row, col, "X");
    else
        gameBoard.setCell(row, col, "O");
    winner = gameBoard.checkBoard();
};
// If cell is unoccupied, place X or O icon in HTML. Also sets message of who won if there is a winner
var updateBoardFrontend = function (iconDiv) {
    iconDiv.innerHTML = currIcon;
    if (currIcon === timesIcon)
        currIcon = circleIcon;
    else
        currIcon = timesIcon;
    if (winner) {
        if (winner === "tie")
            message.textContent = "It's a tie!";
        else
            message.textContent = winner + " wins!";
        // https://stackoverflow.com/questions/1755815/disable-all-click-events-on-page-javascript/48035251
        // Was not able to remove event listeners with parameters, so used this instead
        table.addEventListener("click", preventTableClicks, true); // Disable clicking on table after win
        table.addEventListener("mouseenter", preventTableClicks, true);
    }
};
var clearBoard = function () {
    cells.forEach(function (cellHeader) {
        // Reset variables
        message.textContent = "";
        gameBoard = new Board();
        currIcon = timesIcon;
        // Clear board visually
        var iconDiv = cellHeader.querySelector(".icon-container");
        iconDiv.innerHTML = "";
        table.removeEventListener("click", preventTableClicks, true);
        table.removeEventListener("mouseenter", preventTableClicks, true);
    });
};
var preventTableClicks = function (event) {
    event.stopPropagation();
    event.preventDefault();
};
