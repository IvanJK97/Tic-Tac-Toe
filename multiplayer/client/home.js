const createBtn = document.getElementById("create");
const form = document.querySelector("form");
const gameId = document.querySelector("input[name='gameId");

window.addEventListener("DOMContentLoaded", () => {
  // Clear gameId
  sessionStorage.removeItem("gameId");

  createBtn.addEventListener("click", () => {
    fetch("http://localhost:5000/api/new")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // maybe use query params
        // window.location = `http://localhost:5000/game?abc`;
        sessionStorage.setItem("gameId", data.gameId);
        window.location = "http://localhost:5000/game";
      });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(gameId.value);
    const res = await fetch(`http://localhost:5000/api/${gameId.value}`);
    const resData = await res.json();
    if (!res.ok) {
      console.log(resData.msg);
    } else {
      sessionStorage.setItem("gameId", resData.gameId);
      window.location = "http://localhost:5000/game";
    }
  });
});
