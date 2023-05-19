import './style.css';
import {
  boardArray,
  currentPlayer,
  play,
  isGameOver,
  reset,
} from './game-board';

// cache DOM
const board = document.querySelector('.game-board');
const boardCells = document.querySelectorAll('.game-board-cell');
const gameOverMessage = document.querySelector('.game-over-message');
const modal = document.querySelector('.modal');
const restartBtn = document.querySelector('.restart-btn');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

const render = (array) => {
  array.forEach((value, index) => {
    boardCells.forEach((el) => {
      const cell = el;
      if (index === +cell.getAttribute('id')) {
        cell.textContent = value;
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
  modal.style.display = 'block';
};

const resetGame = () => {
  reset();
  modal.style.display = 'none';
  player1.classList.remove('current-player');
  player2.classList.remove('current-player');
};

const currentTurn = () => {
  if (currentPlayer.getName() === 'player1') {
    player1.classList.add('current-player');
    player2.classList.remove('current-player');
  } else {
    player2.classList.add('current-player');
    player1.classList.remove('current-player');
  }
};

// bind events
board.addEventListener('click', (e) => {
  play(e.target);
  currentTurn();
  gameOver();
  render(boardArray);
});

restartBtn.addEventListener('click', () => {
  resetGame();
  render(boardArray);
});
