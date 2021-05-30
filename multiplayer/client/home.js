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
    sessionStorage.setItem("gameId", gameId.value);
    window.location = "/game";
  });
});
