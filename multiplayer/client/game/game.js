const cells = document.querySelectorAll("th");

const timesIcon = `<i class="fas fa-times times"></i>`;
const circleIcon = `<i class="far fa-circle circle"></i>`;

window.addEventListener("DOMContentLoaded", async () => {
  const currGameId = sessionStorage.getItem("gameId");
  console.log(currGameId);
  cells.forEach((cellHeader) => {
    const cellRow = cellHeader.parentElement;
    const iconDiv = cellHeader.querySelector(".icon");

    cellHeader.addEventListener("click", async () => {
      let currAction = {
        row: +cellRow.dataset.id,
        col: +iconDiv.dataset.id,
        icon: "X",
      };
      const res = await sendRequest(`http://localhost:5000/api/${currGameId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currAction), // Need to match headers
      });
      if (res) {
        renderBoard(res.boardState.board);
      }
    });
  });

  if (currGameId) {
    const res = await sendRequest(`http://localhost:5000/api/${currGameId}`);
    if (res) {
      renderBoard(res.boardState.board);
    }
  } else {
    console.log("No game ID found! Please go back to homepage.");
  }
});

const renderBoard = (boardState) => {
  const tableRow = document.querySelectorAll("tr");
  for (let row = 0; row < boardState.length; row++) {
    const currRow = tableRow[row];
    const tableCol = currRow.querySelectorAll(".icon");
    for (let col = 0; col < boardState[row].length; col++) {
      if (boardState[row][col] === "X") {
        tableCol[col].innerHTML = timesIcon;
      }
      if (boardState[row][col] === "O") {
        tableCol.innerHTML = circleIcon;
      }
    }
  }
};

const sendRequest = async (url, data = {}) => {
  const res = await fetch(url, data);
  const resData = await res.json();
  if (!res.ok) {
    console.log(resData.msg);
    return null;
  }
  return resData;
};
