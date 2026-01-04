import type { Tile } from '../game-logic/tile-class';
import type { T_CoordTuple } from '../types';
import { applyTileComputedStyles } from './utils';

export const createTile = (tile: Tile, coord: T_CoordTuple): HTMLDivElement => {
  const tileWrapperElement = document.createElement('div');
  tileWrapperElement.classList.add('tile');

  const tileElement = document.createElement('div');

  tileElement.textContent = tile.value.toString();

  tileWrapperElement.appendChild(tileElement);

  applyTileComputedStyles(tileWrapperElement, tile, coord);

  return tileWrapperElement;
};
