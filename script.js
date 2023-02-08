const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const game = (() => {
  const boardArray = [null, null, null, null, null, null, null, null, null];

  const player1 = Player('player1', 'X');
  const player2 = Player('player2', 'O');
  const currentPlayer = {};
  Object.assign(currentPlayer, player1);

  const switchTurn = (player) => {
    if (player.getName === player1.getName) {
      Object.assign(player, player2);
    } else {
      Object.assign(player, player1);
    }
  };

  const play = (target) => {
    const index = +target.getAttribute('id');
    if (boardArray[index] === 'O' || boardArray[index] === 'X') {
      return;
    }
    boardArray.splice(index, 1, currentPlayer.getSymbol());
    switchTurn(currentPlayer);
  };

  return { play, boardArray };
})();

const gameBoard = (() => {
  // cache DOM
  const board = document.querySelector('.game-board');
  const boardCells = document.querySelectorAll('.game-board-cell');

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

  // bind events
  board.addEventListener('click', (e) => {
    game.play(e.target);
    render(game.boardArray);
  });
})();
