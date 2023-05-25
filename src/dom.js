import { boardArray, play, isGameOver, reset } from './game-board';
import { player1, player2, currentPlayer, switchTurn } from './players';

// cache DOM
const boardEl = document.getElementById('gameBoard');
const boardElCells = Array.from(boardEl.children);
const gameOverMessage = document.getElementById('gameOverMessage');
const modal = document.getElementById('modal');
const restartBtn = document.getElementById('restartBtn');
const player1El = document.getElementById('player1');
const player2El = document.getElementById('player2');

player1El.textContent = player1.getName();
player2El.textContent = player2.getName();

const render = (array) => {
  array.forEach((value, index) => {
    boardElCells.forEach((el) => {
      if (index === +el.dataset.cellId) {
        el.textContent = value;
      }
    });
  });
};

const gameOver = () => {
  const g = isGameOver();
  if (g === undefined) return;
  if (g === 'Tie') {
    gameOverMessage.textContent = ` ${g}!`;
  } else {
    gameOverMessage.textContent = `Winner is : ${g}`;
  }
  modal.classList.remove('hidden');
  modal.classList.add('block');
};

const resetGame = () => {
  reset();
  modal.classList.remove('block');
  modal.classList.add('hidden');
  player1El.classList.remove('font-bold', 'text-blue-500');
  player2El.classList.remove('font-bold', 'text-blue-500');
};

const currentTurn = () => {
  if (currentPlayer.getId() === 'player1') {
    player1El.classList.add('font-bold', 'text-blue-500');
    player2El.classList.remove('font-bold', 'text-blue-500');
  } else {
    player2El.classList.add('font-bold', 'text-blue-500');
    player1El.classList.remove('font-bold', 'text-blue-500');
  }
};

// bind events
boardEl.addEventListener('click', (e) => {
  if (e.target.textContent === 'X' || e.target.textContent === 'O') return;
  play(e.target);
  render(boardArray);
  gameOver();
  switchTurn(currentPlayer);
  currentTurn();
});

restartBtn.addEventListener('click', () => {
  resetGame();
  render(boardArray);
});

export default render;
