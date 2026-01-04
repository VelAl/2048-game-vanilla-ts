import { gridSize } from '../constants';

export const initBoard = () => {
  const gameBoard = document.getElementById('game-board');

  if (!gameBoard) {
    throw new Error('HTML element with id "game-board" was not found');
  }

  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
  }

  return gameBoard;
};
