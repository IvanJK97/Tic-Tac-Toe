const express = require("express");
const uuid = require("uuid");
const Board = require("../Board");

const router = express.Router();
const gamesList = [];

// Create new game
router.get("/new", (req, res) => {
  const newGame = {
    gameId: uuid.v4(),
    status: "active",
    boardState: new Board(),
  };
  gamesList.push(newGame);
  res.status(200).json(newGame);
});

// Retrieve a game
router.get("/:id", (req, res) => {
  const foundGame = gamesList.find((game) => game.gameId === req.params.id);
  if (foundGame) {
    res.status(200).json(foundGame);
  } else {
    res.status(400).json({ msg: `No game with id: ${req.params.id} found.` });
  }
});

// Set cell
router.post("/:id", (req, res) => {
  const foundGame = gamesList.find((game) => game.gameId === req.params.id);
  if (foundGame) {
    if (
      foundGame.boardState.setCell(req.body.row, req.body.col, req.body.icon)
    ) {
      res.status(200).json(foundGame);
    } else {
      res.status(400).json({
        msg: `Cannot set ${req.body.icon} at row ${req.body.row}, column ${req.body.col}.`,
      });
    }
  } else {
    res.status(400).json({ msg: `No game with id: ${req.params.id} found.` });
  }
});

module.exports = router;
