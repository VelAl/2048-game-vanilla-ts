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

  setTilesOnBoard(tiles: Tile[]) {
    tiles.forEach((tile) => {
      const htmlTileElement = this.#htmlTiles.get(tile.id);

      if (htmlTileElement) {
        applyTileComputedStyles(htmlTileElement, tile);
      } else {
        this.#setNewTileOnBoard(tile);
      }
    });
  }

  removeTilesFromBoard(tiles: Tile[]) {
    tiles.forEach((tile) => {
      const tileElement = this.#htmlTiles.get(tile.id)!;

      this.#htmlTiles.delete(tile.id);

      removeTileUi(tileElement, tile);
    });
  }
}
