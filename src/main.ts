import { Game2048State } from './game-logic';
import { initBoard, createTile } from './game-ui';
import { applyTileComputedStyles, isArrowBtnKey } from './game-ui/utils';

const initGame = () => {
  const boardElement = initBoard();
  let tileElements = new Map<number, HTMLDivElement>();

  const game = new Game2048State();
  const { board } = game.gameState;

  board.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile) {
        const tileElement = createTile(tile, [y, x]);

        tileElements.set(tile.id, tileElement);

        boardElement.appendChild(tileElement);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (!isArrowBtnKey(event.key)) {
      return;
    }

    const isMoved = game.make_move(event.key);

    if (!isMoved) {
      return;
    }

    const tilesToRemove = Array.from(tileElements.keys()).filter(
      (tileId) => !board.some((row) => row.some((tile) => tile?.id === tileId))
    );

    tilesToRemove.forEach((tileId) => {
      const tileElement = tileElements.get(tileId);
      if (tileElement) {
        tileElements.delete(tileId);

        tileElement.style.zIndex = '0';

        setTimeout(() => {
          tileElement.remove();
        }, 300);
      }
    });

    board.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile) {
          if (tileElements.has(tile.id)) {
            const tileElement = tileElements.get(tile.id);

            applyTileComputedStyles(tileElement!, tile, [y, x]);
          } else {
            const tileElement = createTile(tile, [y, x]);
            tileElements.set(tile.id, tileElement);
            boardElement.appendChild(tileElement);
          }
        }
      });
    });
  });
};

initGame();
