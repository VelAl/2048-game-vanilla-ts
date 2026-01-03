import { gameStatus } from '../../constants';
import type { T_GameBoard, T_GameStatus } from '../../types';

export * from './shift_and_merge_line';
export * from './can_merge_any_tile';
export * from './get_line_indexes_by_direction';

export const generate_initial_tile_value = () => {
  return Math.random() < 0.9 ? 2 : 4;
};

export const generate_id = () => {
  const idPart1 = Math.floor(Math.random() * 100);
  const idPart2 = Math.floor(Math.random() * 100);

  const id = (idPart1.toString() + idPart2.toString()).slice(0, 7);

  return Number(id);
};

export const generate_empty_board = (gridSize: 4 | 5 = 4): T_GameBoard => {
  return new Array(gridSize)
    .fill(null)
    .map(() => new Array(gridSize).fill(null));
};

export const get_empty_cells_coords = (board: T_GameBoard) => {
  const emptyCells: { x: number; y: number }[] = [];

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
