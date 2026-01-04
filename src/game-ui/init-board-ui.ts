import { BOARD_SIZE } from '../constants';

export const initBoard = () => {
  const gameBoard = document.getElementById('game-board');

  if (!gameBoard) {
    throw new Error('HTML element with id "game-board" was not found');
  }

  gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${BOARD_SIZE}, 1fr)`;

  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
  }

  return gameBoard;
};
