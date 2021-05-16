const createBtn = document.getElementById("create");
const form = document.querySelector("form");
const gameId = document.querySelector("input[name='gameId']");

window.addEventListener("DOMContentLoaded", () => {
  sessionStorage.removeItem("gameId"); // Clear gameId
  createBtn.addEventListener("click", () => {
    window.location = "/game";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(gameId.value);
    // TODO - add some validation handling
    sessionStorage.setItem("gameId", gameId.value);
    window.location = "/game";
  });
});
