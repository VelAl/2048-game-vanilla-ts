import type { T_CoordTuple, T_Direction } from '../types';
import type { Tile } from '../game-logic/tile-class';
import { directions, gridSize, tileColors } from '../constants';

export const getTileComputedStyles = (tile: Tile, coord: T_CoordTuple) => {
  const top = `${(coord[0] * 100) / gridSize}%`;
  const left = `${(coord[1] * 100) / gridSize}%`;
  const width = `${100 / gridSize}%`;

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
  tile: Tile,
  coord: T_CoordTuple
) => {
  const { top, left, width, backgroundColor, color } = getTileComputedStyles(
    tile,
    coord
  );

  container.style.top = top;
  container.style.left = left;
  container.style.width = width;

  const tileElement = container.querySelector('div')!;
  tileElement.textContent = tile.value.toString();

  tileElement.style.backgroundColor = backgroundColor;
  tileElement.style.color = color;
};

export const isArrowBtnKey = (key: string): key is T_Direction => {
  return Object.values(directions).includes(key as T_Direction);
};
