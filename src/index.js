import './style.css';
import { boardArray } from './game-board';
import render from './dom';

window.addEventListener('load', (e) => {
  render(boardArray);
});
