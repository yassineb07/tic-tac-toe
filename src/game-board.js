import { player1, currentPlayer } from './players';

const boardArray = [null, null, null, null, null, null, null, null, null];

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
  const index = +target.dataset.cellId;
  boardArray.splice(index, 1, currentPlayer.getSymbol());
};

const reset = () => {
  boardArray.forEach((element, index) => {
    boardArray[index] = null;
  });
  Object.assign(currentPlayer, player1);
};

export { boardArray, play, isGameOver, reset };
