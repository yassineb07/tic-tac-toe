const Player = (id, name, symbol) => {
  const getId = () => id;
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getId, getName, getSymbol };
};

const player1 = Player("player1", "PLAYER 1", "X");
const player2 = Player("player2", "PLAYER 2", "O");

const currentPlayer = {};

const setCurrentPlayer = (playerObj) => {
  if (playerObj.getId === player1.getId) {
    Object.assign(playerObj, player2);
  } else {
    Object.assign(playerObj, player1);
  }
};

export { player1, player2, currentPlayer, setCurrentPlayer };
