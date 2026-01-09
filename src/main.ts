import { Game2048State } from './game-logic';
import type { Tile } from './game-logic/tile-class';
import {
  initBoard,
  createTile,
  removeTileUi,
  applyTileComputedStyles,
  isArrowBtnKey,
  ScoreUiHandler,
} from './game-ui';
import { LS_GameStateManager } from './local-storage-manager';

const initGame = () => {
  const scoreUiHandler = new ScoreUiHandler();
  const boardElement = initBoard();

  let htmlTiles = new Map<number, HTMLDivElement>();

  const lsGameStateManager = new LS_GameStateManager();
  const game = new Game2048State(lsGameStateManager.savedState);
  scoreUiHandler.setUiScrores(game.gameState);

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

    lsGameStateManager.saveState(game.gameState);
    scoreUiHandler.setUiScrores(game.gameState);

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
