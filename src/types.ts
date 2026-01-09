import type { directions, gameStatus } from './constants';
import type { Tile } from './game-logic/tile-class';

export type T_GameStatus = (typeof gameStatus)[keyof typeof gameStatus];

export type T_Direction = (typeof directions)[keyof typeof directions];

export type T_TileCoords = { y: number; x: number };

/**
 * Represents a vertical or horizontal line of the T_GameBoard type
 */
export type T_BoardLine = (null | Tile)[];

export type T_GameBoard = T_BoardLine[];

export type T_SavedBoard = (null | Tile['value'])[][];

export type T_LS_State = {
  score: number;
  bestScore: number;
  board: T_SavedBoard;
};
