import { MOVEMENT_DURATION } from '../../../constants';
import type { Tile } from '../../../game-logic/tile-class';
import { applyTileComputedStyles } from './upply-tile-computed-styles';

export const removeTileUi = (tileElement: HTMLDivElement, tile: Tile) => {
  applyTileComputedStyles(tileElement, tile);
  tileElement.style.zIndex = '0';

  setTimeout(() => {
    tileElement.remove();
  }, MOVEMENT_DURATION);
};
