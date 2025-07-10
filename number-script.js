let currentNumber = 1;
let totalNumbers = 25;
const grid = document.getElementById("grid");
const winMessage = document.getElementById("win-message");
const levelSelect = document.getElementById("level");

levelSelect.addEventListener("change", startGame);

function startGame() {
  const level = parseInt(levelSelect.value);
  if (level === 1) totalNumbers = 9;
  else if (level === 2) totalNumbers = 16;
  else totalNumbers = 25;

  grid.className = "grid";
  if (level === 1) grid.classList.add("easy");
  else if (level === 2) grid.classList.add("medium");
  else grid.classList.add("hard");

  currentNumber = 1;
  winMessage.classList.add("hidden");
  grid.innerHTML = "";

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
    if (num === currentNumber) {
      btn.style.visibility = "hidden";
      currentNumber++;
      if (currentNumber > totalNumbers) {
        showWinMessage();
      }
    } else {
      // Show Try Again message and disable all numbers
      showTryAgain();
    }
  }
                                                                                                                                                                                                               

function showWinMessage() {
  winMessage.classList.remove("hidden");
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });
}

// tsParticles
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

window.onload = startGame;
 
function showTryAgain() {
    const message = document.createElement("h2");
    message.textContent = "❌ Try Again!";
    message.style.color = "#ff0080";
    message.style.marginTop = "20px";
    message.style.animation = "fadeIn 0.5s ease-in-out";
    winMessage.innerHTML = "";
    winMessage.appendChild(message);
    winMessage.classList.remove("hidden");
    const retryBtn = document.createElement("button");
    retryBtn.textContent = "Restart";
    retryBtn.onclick = startGame;
    winMessage.appendChild(retryBtn);
    
    // Disable further clicking
    const allNumbers = document.querySelectorAll(".number");
    allNumbers.forEach(btn => {
      btn.style.pointerEvents = "none";
      btn.style.opacity = "0.5";
    });
  }
