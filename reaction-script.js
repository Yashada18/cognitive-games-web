let sequence = [];
let userSequence = [];
let level = 1;
const totalLevels = 10;
const grid = document.getElementById('circle-grid');
const levelInfo = document.getElementById('level-info');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const tryAgainBtn = document.getElementById('try-again-btn');

function generateCircles() {
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.classList.add('circle');
    div.dataset.index = i;
    div.addEventListener('click', () => handleUserTap(i));
    grid.appendChild(div);
  }
}

function generateSequence(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 9));
}

function glowCircle(index, delay) {
  const circles = document.querySelectorAll('.circle');
  setTimeout(() => {
    circles[index].classList.add('glow');
    setTimeout(() => circles[index].classList.remove('glow'), 500);
  }, delay);
}

function playSequence() {
  userSequence = [];
  sequence.forEach((index, i) => {
    glowCircle(index, i * 800);
  });
}

function handleUserTap(index) {
  if (userSequence.length >= sequence.length) return;

  userSequence.push(index);
  document.querySelector(`.circle[data-index="${index}"]`).classList.add('selected');

  const current = userSequence.length - 1;
  if (userSequence[current] !== sequence[current]) {
    showTryAgain();
    return;
  }

  if (userSequence.length === sequence.length) {
    setTimeout(() => {
      showSuccess();
    }, 500);
  }
}

function showSuccess() {
  confetti();
  nextBtn.classList.remove('hidden');
  tryAgainBtn.classList.add('hidden');
  document.getElementById('try-again-msg').classList.add('hidden');
  startBtn.classList.add('hidden');
}

function showTryAgain() {
  document.getElementById('try-again-msg').classList.remove('hidden');
  tryAgainBtn.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  startBtn.classList.add('hidden');
}

function startLevel() {
  generateCircles();
  sequence = generateSequence(level + 2);
  userSequence = [];

  startBtn.classList.add('hidden');
  tryAgainBtn.classList.add('hidden');
  document.getElementById('try-again-msg').classList.add('hidden');
  nextBtn.classList.add('hidden');
  levelInfo.textContent = `Level: ${level}`;

  // Give time for DOM to render
  setTimeout(() => {
    playSequence();
  }, 200);
}

function nextLevel() {
  if (level < totalLevels) {
    level++;
    startLevel();
  } else {
    alert("🎉 You've completed all levels!");
  }
}

function retryLevel() {
  startLevel();
}

function goToMenu() {
  window.location.href = '../games.html';
}

// tsParticles background
tsParticles.load("tsparticles", {
  background: { color: "#0d0d0d" },
  particles: {
    number: { value: 60 },
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
