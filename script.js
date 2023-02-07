const Player = (name, symbol) => {};

const gameBoard = (() => {
  // const boardArray = ['X', 'O', 'O', 'X', 'O', 'X', 'X', 'O', 'O'];
  const boardArray = [null, null, null, null, null, null, null, null, null];

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

  const placeMarker = (target) => {
    const index = +target.getAttribute('id');
    if (boardArray[index] === 'O' || boardArray[index] === 'X') {
      return;
    }
    boardArray.splice(index, 1, 'O');
  };

  // bind events
  board.addEventListener('click', (e) => {
    placeMarker(e.target);
    render();
  });
})();

const game = (() => {})();
