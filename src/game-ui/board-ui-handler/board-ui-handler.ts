import type { Tile } from '../../game-logic/tile-class';
import {
  applyTileComputedStyles,
  removeTileUi,
  initBoardUi,
  createTileUi,
} from './utils';

export class BoardUiHandler {
  #boardElement: HTMLElement;
  #htmlTiles: Map<number, HTMLDivElement>;

  constructor() {
    this.#boardElement = initBoardUi();
    this.#htmlTiles = new Map<number, HTMLDivElement>();
  }

  #setNewTileOnBoard(tile: Tile) {
    const tileElement = createTileUi(tile);
    this.#htmlTiles.set(tile.id, tileElement);
    this.#boardElement.appendChild(tileElement);
  }

  /**
   * Places new tiles on the board, updates the styles of existing tiles, removes the merged tiles UI.
   * @param tiles - an array of `Tile` objects to add or update on the board
   */
  setTilesUi(tiles: Tile[]) {
    this.#clearMergedTilesUi(tiles);

    tiles.forEach((tile) => {
      const htmlTileElement = this.#htmlTiles.get(tile.id);

      if (htmlTileElement) {
        applyTileComputedStyles(htmlTileElement, tile);
      } else {
        this.#setNewTileOnBoard(tile);
      }
    });
  }

  #clearMergedTilesUi(tiles: Tile[]) {
    const tilesToRemove = tiles.reduce((akk, tile) => {
      if (tile.mergedInTile) {
        akk.push(tile.mergedInTile);
      }

      return akk;
    }, [] as Tile[]);

    tilesToRemove.forEach((tile) => {
      const tileElement = this.#htmlTiles.get(tile.id)!;

      this.#htmlTiles.delete(tile.id);

      removeTileUi(tileElement, tile);
    });
  }

  clearBoard() {
    this.#htmlTiles.forEach((tileElement) => {
      tileElement.remove();
    });
    this.#htmlTiles.clear();
  }
}
