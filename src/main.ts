import { Game2048State } from './game-logic';
import type { Tile } from './game-logic/tile-class';
import {
  initBoard,
  createTile,
  removeTileUi,
  applyTileComputedStyles,
  isArrowBtnKey,
} from './game-ui';

const initGame = () => {
  const boardElement = initBoard();

  let htmlTiles = new Map<number, HTMLDivElement>();

  const game = new Game2048State();

  const setTileOnBoard = (tile: Tile) => {
    const tileElement = createTile(tile);
    htmlTiles.set(tile.id, tileElement);
    boardElement.appendChild(tileElement);
  };

  game.tiles.forEach(setTileOnBoard);

  document.addEventListener('keydown', (event) => {
    if (!isArrowBtnKey(event.key)) return;

    const result = game.make_move(event.key);

    if (!result) return;

    const { tilesToRemove } = result;

    tilesToRemove.forEach((tile) => {
      const tileElement = htmlTiles.get(tile.id)!;

      htmlTiles.delete(tile.id);

      removeTileUi(tileElement, tile);
    });

    game.tiles.forEach((tile) => {
      const htmlTileElement = htmlTiles.get(tile.id);

      if (htmlTileElement) {
        applyTileComputedStyles(htmlTileElement, tile);
      } else {
        setTileOnBoard(tile);
      }
    });
  });
};

initGame();
