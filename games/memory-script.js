const emojis = ['🍎', '🍌', '🍇', '🍒', '🍓', '🍉', '🍍', '🥝', '🍋', '🥑', '🍑', '🍊'];
const cardGrid = document.getElementById('card-grid');
const levelSelect = document.getElementById('level');
const playAgainBtn = document.getElementById('play-again-btn');

let flippedCards = [];
let matchedCards = [];

function startGame() {
  playAgainBtn.style.display = "none";
  const level = parseInt(levelSelect.value);
  let gridSize, pairs;

  if (level === 1) {
    gridSize = [2, 2];
    pairs = 2;
  } else if (level === 2) {
    gridSize = [4, 3];
    pairs = 6;
  } else {
    gridSize = [4, 5];
    pairs = 10;
  }

  const selected = shuffle([...emojis]).slice(0, pairs);
  const cards = shuffle([...selected, ...selected]);

  flippedCards = [];
  matchedCards = [];
  cardGrid.innerHTML = '';
  cardGrid.style.gridTemplateColumns = `repeat(${gridSize[0]}, 80px)`;
// Optional: makes the grid take up more horizontal space
cardGrid.style.width = `${gridSize[0] * 120}px`; // You can adjust 120 to increase/decrease

  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerText = '?';

    card.addEventListener('click', () => flipCard(card));
    cardGrid.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains('flipped') || matchedCards.includes(card)) return;

  card.classList.add('flipped');
  card.innerText = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 600);
  }
}

function checkMatch() {
  const [c1, c2] = flippedCards;
  if (c1.dataset.emoji === c2.dataset.emoji) {
    matchedCards.push(c1, c2);
  } else {
    c1.classList.remove('flipped');
    c2.classList.remove('flipped');
    c1.innerText = '?';
    c2.innerText = '?';
  }

  flippedCards = [];

  if (matchedCards.length === cardGrid.children.length) {
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
          
          document.getElementById("level-complete").classList.remove("hidden");
          
      playAgainBtn.style.display = "inline-block";
    }, 300);
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function goBack() {
  window.location.href = '../games.html';
}

window.onload = () => {
  startGame();
  levelSelect.addEventListener('change', startGame); // 🔥 Auto restart on level change
};
function nextLevel() {
    // Hide the level complete message
    document.getElementById("level-complete").classList.add("hidden");
  
    // Reset the matched cards counter
    matchedCards = 0;
  
    // Clear the board
    gameBoard.innerHTML = "";
  
    // Regenerate cards based on the same current level
    const [rows, cols] = levelGrid[level];
    createBoard(rows, cols);
  }
  
  
  function goToMenu() {
    window.location.href = "../games.html"; // adjust path if needed
  }
  