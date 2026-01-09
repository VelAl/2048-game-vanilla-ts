import { tileColors, BOARD_SIZE } from '../../../constants';
import type { Tile } from '../../../game-logic/tile-class';

export const getTileComputedStyles = (tile: Tile) => {
  const top = `${(tile.coords.y * 100) / BOARD_SIZE}%`;
  const left = `${(tile.coords.x * 100) / BOARD_SIZE}%`;
  const width = `${100 / BOARD_SIZE}%`;

  const { backgroundColor, color } = tileColors[tile.value];

  return {
    top,
    left,
    width,
    backgroundColor,
    color,
  };
};

export const applyTileComputedStyles = (
  container: HTMLDivElement,
  tile: Tile
) => {
  const { top, left, width, backgroundColor, color } =
    getTileComputedStyles(tile);

  container.style.top = top;
  container.style.left = left;
  container.style.width = width;

  const tileElement = container.querySelector('div')!;
  tileElement.textContent = tile.value.toString();

  tileElement.style.backgroundColor = backgroundColor;
  tileElement.style.color = color;
};
