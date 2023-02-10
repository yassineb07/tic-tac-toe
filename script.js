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

  const checkWin = () => {
    const winingCombinations = [
      [boardArray[0], boardArray[1], boardArray[2]],
      [boardArray[3], boardArray[4], boardArray[5]],
      [boardArray[6], boardArray[7], boardArray[8]],
      [boardArray[0], boardArray[3], boardArray[6]],
      [boardArray[1], boardArray[4], boardArray[7]],
      [boardArray[2], boardArray[5], boardArray[8]],
      [boardArray[0], boardArray[4], boardArray[8]],
      [boardArray[2], boardArray[4], boardArray[6]],
    ];
    return winingCombinations.some((combination) =>
      combination.every((el) => el === combination[0] && el !== null)
    );
  };

  const checkTie = () => boardArray.every((el) => el !== null);

  const isGameOver = () => {
    if (checkWin()) {
      switchTurn(currentPlayer);
      return currentPlayer.getName();
    }
    if (checkTie()) {
      return 'Tie';
    }
    return undefined;
  };

  const play = (target) => {
    const index = +target.getAttribute('id');
    if (boardArray[index] === 'O' || boardArray[index] === 'X') {
      return;
    }
    boardArray.splice(index, 1, currentPlayer.getSymbol());
    switchTurn(currentPlayer);
  };

  const reset = () => {
    boardArray.forEach((element, index) => {
      boardArray[index] = null;
    });
    Object.assign(currentPlayer, player1);
  };

  return { boardArray, currentPlayer, play, isGameOver, reset };
})();

const gameBoard = (() => {
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
    const g = game.isGameOver();
    if (g === undefined) return;
    if (g === 'Tie') {
      gameOverMessage.textContent = ` ${g}!`;
    } else {
      gameOverMessage.textContent = `Winner is : ${g}`;
    }
    modal.style.display = 'block';
  };

  const resetGame = () => {
    game.reset();
    modal.style.display = 'none';
    player1.classList.remove('current-player');
    player2.classList.remove('current-player');
  };

  const currentTurn = () => {
    if (game.currentPlayer.getName() === 'player1') {
      player1.classList.add('current-player');
      player2.classList.remove('current-player');
    } else {
      player2.classList.add('current-player');
      player1.classList.remove('current-player');
    }
  };

  // bind events
  board.addEventListener('click', (e) => {
    game.play(e.target);
    currentTurn();
    gameOver();
    render(game.boardArray);
  });

  restartBtn.addEventListener('click', () => {
    resetGame();
    render(game.boardArray);
  });
})();
