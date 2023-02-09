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
  };

  const reset = () => {
    boardArray.forEach((element, index) => {
      boardArray[index] = null;
    });
    Object.assign(currentPlayer, player1);
  };

  return { boardArray, currentPlayer, play, isGameOver, switchTurn, reset };
})();

const gameBoard = (() => {
  // cache DOM
  const board = document.querySelector('.game-board');
  const boardCells = document.querySelectorAll('.game-board-cell');
  const gameOverMessage = document.querySelector('.game-over-message');
  const modal = document.querySelector('.modal');
  const restartBtn = document.querySelector('.restart-btn');

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
  };
  // bind events
  board.addEventListener('click', (e) => {
    game.play(e.target);
    gameOver();
    game.switchTurn(game.currentPlayer);
    render(game.boardArray);
  });
  restartBtn.addEventListener('click', (e) => {
    resetGame();
    render(game.boardArray);
  });
})();
