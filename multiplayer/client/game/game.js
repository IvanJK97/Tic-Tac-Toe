const socket = io();
const message = document.getElementById("message");
let selfIcon = "";
let currGameId = null;

window.addEventListener("DOMContentLoaded", () => {
  currGameId = sessionStorage.getItem("gameId");

  if (currGameId === null) {
    socket.emit("createGame"); // Creating a new game
  } else {
    socket.emit("joinGame", currGameId); // Joining a game
  }

  const cells = document.querySelectorAll("th");
  cells.forEach((cellHeader) => {
    const cellRow = cellHeader.parentElement;
    const iconDiv = cellHeader.querySelector(".icon");

    cellHeader.addEventListener("click", () => {
      const currMove = {
        gameId: currGameId,
        row: +cellRow.dataset.id,
        col: +iconDiv.dataset.id,
        icon: selfIcon,
      };
      socket.emit("placeCell", currMove);
    });
  });

  const homeBtn = document.getElementById("home");
  homeBtn.addEventListener("click", () => {
    sessionStorage.removeItem("gameId"); // Clear gameId
    window.location.href = "/";
  });
});

const renderBoard = (board) => {
  const timesIcon = `<i class="fas fa-times times"></i>`;
  const circleIcon = `<i class="far fa-circle circle"></i>`;
  const tableRow = document.querySelectorAll("tr");
  for (let row = 0; row < board.length; row++) {
    const currRow = tableRow[row];
    const tableCol = currRow.querySelectorAll(".icon");
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === "X") {
        tableCol[col].innerHTML = timesIcon;
      }
      if (board[row][col] === "O") {
        tableCol[col].innerHTML = circleIcon;
      }
    }
  }
};

socket.on("createdGame", (res) => {
  currGameId = res.gameId;
  sessionStorage.setItem("gameId", currGameId);
  renderBoard(res.boardState.board);
  socket.emit("pickSide", res.gameId);
});

socket.on("joinedGame", (res) => {
  if (res.error) {
    message.textContent = res.msg;
    // Remove board here
    const table = document.getElementsByTagName("TABLE")[0];
    table.remove();
  } else {
    renderBoard(res.boardState.board);
    socket.emit("pickSide", currGameId);
  }
});

socket.on("pickedSide", (res) => {
  if (res.error) {
    message.textContent = res.msg;
  } else {
    selfIcon = res;
    const gameInfo = document.getElementById("game");
    const playerInfo = document.getElementById("player");
    gameInfo.textContent = `Game ID: ${currGameId}`;
    playerInfo.textContent = `Playing as: ${selfIcon}`;
  }
});

socket.on("newBoardState", (res) => {
  if (!res.error) {
    if (res.msg) message.textContent = res.msg;
    renderBoard(res.boardState.board);
  }
});

socket.on("disconnected", (res) => {
  message.textContent = res.msg;
});
