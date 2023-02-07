const Player = (name) => {};

const gameBoard = (() => {
  const boardArray = ['X', 'O', 'O', 'X', 'O', 'X', 'X', 'O', 'O'];

  // cache DOM
  const board = document.querySelector('.game-board');
  const boardCells = document.querySelectorAll('.game-board-cell');

  const render = () => {
    boardArray.forEach((value, index) => {
      boardCells.forEach((el) => {
        const cell = el;
        if (index === +cell.getAttribute('id')) {
          cell.textContent = value;
        }
      });
    });
  };

  return { render };
})();

const game = (() => {})();

gameBoard.render();
