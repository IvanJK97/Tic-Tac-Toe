const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const {
  createNewGame,
  findGame,
  randomlyPickSides,
  placeIcon,
  leaveGame,
} = require("./utils/games");

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "client")));

const createError = (errorMsg) => {
  return {
    error: true,
    msg: errorMsg,
  };
};

io.on("connection", (socket) => {
  let currGameId = null;

  socket.on("createGame", () => {
    const newGame = createNewGame();
    socket.join(newGame.gameId);
    currGameId = newGame.gameId;
    socket.emit("createdGame", newGame);
  });

  socket.on("joinGame", (gameId) => {
    const foundGame = findGame(gameId);
    if (!foundGame) {
      socket.emit(
        "joinedGame",
        createError(`No game with id: ${gameId} found.`)
      );
      return;
    }

    if (foundGame.sides["X"] && foundGame.sides["O"])
      socket.emit(
        "joinedGame",
        createError(`Game with id: ${gameId} already has two players`)
      );
    else {
      socket.join(foundGame.gameId);
      currGameId = foundGame.gameId;
      socket.emit("joinedGame", foundGame);
    }
  });

  socket.on("pickSide", (gameId) => {
    const foundGame = findGame(gameId);
    if (!foundGame) {
      socket.emit(
        "pickedSide",
        createError(`No game with id: ${gameId} found.`)
      );
      return;
    }

    if (!foundGame.sides["X"] && !foundGame.sides["O"]) {
      // Both sides open, pick one randomly
      const side = randomlyPickSides();
      foundGame.sides[side] = socket.id;
      socket.emit("pickedSide", side);
    } else if (foundGame.sides["X"]) {
      // Only O is open, pick O
      foundGame.sides["O"] = socket.id;
      socket.join(foundGame.gameId);
      socket.emit("pickedSide", "O");
    } else if (foundGame.sides["O"]) {
      // Only X is open, pick X
      foundGame.sides["X"] = socket.id;
      socket.join(foundGame.gameId);
      socket.emit("pickedSide", "X");
    }
  });

  socket.on("getBoard", (gameId) => {
    const foundGame = findGame(gameId);
    if (foundGame) {
      socket.emit("newBoardState", foundGame);
    } else {
      socket.emit(
        "newBoardState",
        createError(`No game with id: ${gameId} found.`)
      );
    }
  });

  socket.on("placeCell", ({ gameId, row, col, icon }) => {
    // Broadcast to all players in game
    io.to(gameId).emit("newBoardState", placeIcon(gameId, row, col, icon));
  });

  socket.on("disconnect", () => {
    const leftGame = leaveGame(currGameId);
    if (leftGame) {
      io.to(currGameId).emit("disconnected", {
        msg: "A player has left the game. Game is now inactive.",
      });
    }
  });
});

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
