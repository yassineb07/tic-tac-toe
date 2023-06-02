import "./style.css";
import { currentPlayer, player1 } from "./players";
import { boardArray } from "./game-board";
import { render, currentTurn } from "./dom";

function startGame() {
  Object.assign(currentPlayer, player1);
  currentTurn();
  render(boardArray);
}

window.addEventListener("load", (e) => {
  startGame();
});
