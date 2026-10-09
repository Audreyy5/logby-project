
const nameForm = document.getElementById("nameForm");
const playerNameInput = document.getElementById("playerName");
const nameError = document.getElementById("nameError");

nameForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const playerName = playerNameInput.value.trim();

    if (playerName.length === 0) {
        nameError.textContent = "Please enter your name first!";
        playerNameInput.setAttribute("aria-invalid", "true");
        playerNameInput.focus();
        return;
    }

    sessionStorage.setItem("logbyPlayerName", playerName);

    nameError.textContent = "";
    playerNameInput.removeAttribute("aria-invalid");

    sessionStorage.setItem("logbyPlayerName", playerName);
    window.location.href = "quiz.html";
});
