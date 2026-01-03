export const initBoard = (gridSise: 4 | 5 = 4) => {
  const gameBoard = document.getElementById('game-board');

  if (!gameBoard) {
    throw new Error('HTML element with id "game-board" was not found');
  }

  gameBoard.style.gridTemplateColumns = `repeat(${gridSise}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${gridSise}, 1fr)`;

  for (let i = 0; i < gridSise * gridSise; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
  }

  return gameBoard;
};
