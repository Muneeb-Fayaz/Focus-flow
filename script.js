const clock = document.getElementById("clock");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const modeButtons = document.querySelectorAll(".mode");

let selectedMinutes = 25;
let secondsLeft = selectedMinutes * 60;
let timer = null;
let running = false;

function showTime() {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  clock.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
  running = false;
  startBtn.textContent = "Continue";
}

function startTimer() {
  if (running) {
    pauseTimer();
    statusText.textContent = "Paused. Take your time.";
    return;
  }

  running = true;
  startBtn.textContent = "Pause";
  statusText.textContent = "You're doing great. Stay with it.";

  timer = setInterval(() => {
    secondsLeft--;
    showTime();

    if (secondsLeft <= 0) {
      pauseTimer();
      secondsLeft = 0;
      showTime();
      startBtn.textContent = "Start again";
      statusText.textContent = "Session complete. Nice work!";
    }
  }, 1000);
}

function resetTimer() {
  pauseTimer();
  secondsLeft = selectedMinutes * 60;
  showTime();
  startBtn.textContent = "Start focus";
  statusText.textContent = "Ready when you are.";
}

modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    modeButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    selectedMinutes = Number(button.dataset.minutes);
    resetTimer();
  });
});

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

document.getElementById("saveTask").addEventListener("click", () => {
  const task = document.getElementById("taskInput").value.trim();
  const output = document.getElementById("taskOutput");
  output.textContent = task ? `Today's focus: ${task}` : "Add a task first, then save it.";
});
showTime();
