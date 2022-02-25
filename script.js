let currentPlayer = "X";
let nextPlayer = "O";
const board = document.querySelector("[data-board]");
const buttons = board.querySelectorAll("[data-slot]");
const messageContainer = document.querySelector("[data-messages]");

startInteraction();

function setUp() {
  console.log("running setup");
  buttonsList = [...buttons];
  buttonsList.forEach((element) => {
    element.removeAttribute("data-state");
    element.removeAttribute("data-letter");
    element.innerText = "";
    currentPlayer = "X";
    nextPlayer = "O";
  });
}

function startInteraction() {
  board.addEventListener("click", clickEvent);
}

function stopInteraction() {
  board.removeEventListener("click", clickEvent);
}

function clickEvent(e) {
  if (e.target.matches('[data-state="active"]')) {
    showMessage("That space is already taken, Choose again!", 1000);
    return;
  }
  if (e.target.matches("[data-slot]")) {
    addLetter(e.target);
    checkWinLose(e.target);
    [currentPlayer, nextPlayer] = [nextPlayer, currentPlayer];
    return;
  }
}

function addLetter(box) {
  box.dataset.state = "active";
  box.dataset.letter = currentPlayer;
  box.innerText = currentPlayer;
}

function checkWinLose() {
  buttons_array = [...buttons];
  if (
    (buttons_array[0].dataset.letter == currentPlayer &&
      buttons_array[1].dataset.letter == currentPlayer &&
      buttons_array[2].dataset.letter == currentPlayer) ||
    (buttons_array[3].dataset.letter == currentPlayer &&
      buttons_array[4].dataset.letter == currentPlayer &&
      buttons_array[5].dataset.letter == currentPlayer) ||
    (buttons_array[6].dataset.letter == currentPlayer &&
      buttons_array[7].dataset.letter == currentPlayer &&
      buttons_array[8].dataset.letter == currentPlayer) ||
    (buttons_array[0].dataset.letter == currentPlayer &&
      buttons_array[3].dataset.letter == currentPlayer &&
      buttons_array[6].dataset.letter == currentPlayer) ||
    (buttons_array[1].dataset.letter == currentPlayer &&
      buttons_array[4].dataset.letter == currentPlayer &&
      buttons_array[7].dataset.letter == currentPlayer) ||
    (buttons_array[2].dataset.letter == currentPlayer &&
      buttons_array[5].dataset.letter == currentPlayer &&
      buttons_array[8].dataset.letter == currentPlayer) ||
    (buttons_array[0].dataset.letter == currentPlayer &&
      buttons_array[4].dataset.letter == currentPlayer &&
      buttons_array[8].dataset.letter == currentPlayer) ||
    (buttons_array[2].dataset.letter == currentPlayer &&
      buttons_array[4].dataset.letter == currentPlayer &&
      buttons_array[6].dataset.letter == currentPlayer)
  ) {
    showMessage(
      currentPlayer + " has won! Click anywhere to start again.",
      5000
    );
    stopInteraction();

    setTimeout(() => {
      document.addEventListener(
        "click",
        () => {
          setUp();
          startInteraction();
        },
        { once: true }
      );
    }, 1);
    return;
  }
}

function showMessage(message, duration = 1000) {
  const alert = document.createElement("div");
  alert.textContent = message;
  alert.classList.add("alert");
  messageContainer.prepend(alert);
  if (duration == null) return;
  setTimeout(() => {
    alert.classList.add("hide");
    alert.addEventListener("transitionend", () => {
      alert.remove();
    });
  }, duration);
}
