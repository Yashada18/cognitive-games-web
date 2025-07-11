let currentNumber = 1;
let totalNumbers = 25;
let gameOver = false;

const grid = document.getElementById("grid");
const winMessage = document.getElementById("win-message");
const levelSelect = document.getElementById("level");

levelSelect.addEventListener("change", startGame);

function startGame() {
  const level = parseInt(levelSelect.value);
  if (level === 1) totalNumbers = 9;
  else if (level === 2) totalNumbers = 16;
  else totalNumbers = 25;

  gameOver = false;
  currentNumber = 1;

  winMessage.classList.add("hidden");
  winMessage.innerHTML = ""; // Clear any previous messages

  grid.innerHTML = "";
  grid.className = "grid";
  if (level === 1) grid.classList.add("easy");
  else if (level === 2) grid.classList.add("medium");
  else grid.classList.add("hard");

  const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);

  numbers.forEach(num => {
    const btn = document.createElement("div");
    btn.className = "number";
    btn.textContent = num;
    btn.addEventListener("click", () => handleClick(num, btn));
    grid.appendChild(btn);
  });
}

function handleClick(num, btn) {
  if (gameOver) return;

  if (num === currentNumber) {
    btn.style.visibility = "hidden";
    currentNumber++;
    if (currentNumber > totalNumbers) {
      gameOver = true;
      showWinMessage();
    }
  } else {
    gameOver = true;
    showTryAgain();
  }
}

function showWinMessage() {
  winMessage.innerHTML = `
    <h2>🎉 Well Done!</h2>
    <button onclick="startGame()">Play Again</button>
  `;
  winMessage.classList.remove("hidden");

  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });
}

function showTryAgain() {
  winMessage.innerHTML = `
    <h2 style="color: #ff0080;">❌ Try Again!</h2>
    <button onclick="startGame()">Restart</button>
  `;
  winMessage.classList.remove("hidden");

  const allNumbers = document.querySelectorAll(".number");
  allNumbers.forEach(btn => {
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.5";
  });
}

// Particles background
tsParticles.load("tsparticles", {
  background: {
    color: "#0d0d0d"
  },
  particles: {
    number: { value: 80 },
    size: { value: 2 },
    color: { value: "#00ffcc" },
    move: { enable: true, speed: 1 },
    opacity: { value: 0.3 },
    links: {
      enable: true,
      distance: 100,
      color: "#00ffcc",
      opacity: 0.3
    }
  },
  fullScreen: { enable: false }
});
const score = 180;
localStorage.setItem("scoreMemory", score); // ✅ saves score

window.onload = startGame;