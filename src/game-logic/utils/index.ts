import { gameStatus, BOARD_SIZE } from '../../constants';
import type { T_GameBoard, T_GameStatus, T_TileCoords } from '../../types';

export * from './shift_and_merge_line';
export * from './can_merge_any_tile';
export * from './get_line_indexes_by_direction';

export const generate_initial_tile_value = () => {
  return Math.random() < 0.9 ? 2 : 4;
};

export const generate_id = () => {
  const time = Date.now() % 1e6;
  const rand = Math.floor(Math.random() * 1e3);
  return time * 1e3 + rand;
};

export const generate_empty_board = (): T_GameBoard => {
  return new Array(BOARD_SIZE)
    .fill(null)
    .map(() => new Array(BOARD_SIZE).fill(null));
};

export const get_empty_cells_coords = (board: T_GameBoard): T_TileCoords[] => {
  const emptyCells: T_TileCoords[] = [];

  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell) {
        emptyCells.push({ x, y });
      }
    });
  });

  return emptyCells;
};

export const board_has_won_tile = (board: T_GameBoard) =>
  board.some((row) => row.some((cell) => cell?.value === 2048));

export const is_move_borbidden = (status: T_GameStatus): boolean =>
  status === gameStatus.LOST || status === gameStatus.WON;
