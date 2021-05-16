const uuid = require("uuid");
const Board = require("../Board");

const gamesList = [];

// Create new game
const createNewGame = () => {
  const newGame = {
    gameId: uuid.v4(),
    status: "active",
    boardState: new Board(),
    sides: { X: "", O: "" },
  };
  gamesList.push(newGame);
  return newGame;
};

// Place icon (X or O) on board
const placeIcon = (gameId, row, col, icon) => {
  if (icon !== "X" && icon !== "O")
    return {
      error: true,
      msg: `Icon must be X or O.`,
    };

  const foundGame = findGame(gameId);
  if (foundGame && foundGame.status === "active") {
    if (foundGame.boardState.setCell(row, col, icon)) {
      foundGame.boardState.checkBoard();
      if (foundGame.boardState.winner) {
        return {
          error: false,
          msg: foundGame.boardState.winner,
          boardState: foundGame.boardState,
        };
      }
      return {
        error: false,
        msg: `${foundGame.boardState.turn}'s turn`,
        boardState: foundGame.boardState,
      };
    } else {
      return {
        error: true,
        msg: `Cannot set ${icon} at row ${row}, column ${col}.`,
      };
    }
  }
  return {
    error: true,
    msg: `No game with id: ${gameId} found.`,
  };
};

// Randomly returns X or O with equal prob.
const randomlyPickSides = () => {
  const zeroOne = Math.round(Math.random());
  if (zeroOne) return "X";
  return "O";
};

// Retrieve game
const findGame = (gameId) => {
  return gamesList.find((game) => game.gameId === gameId);
};

// Leave game by setting status to inactive
const leaveGame = (gameId) => {
  const foundGame = findGame(gameId);
  if (foundGame) {
    foundGame.status = "inactive";
    return true;
  }
  return false;
};

module.exports = {
  createNewGame,
  findGame,
  randomlyPickSides,
  placeIcon,
  leaveGame,
};
