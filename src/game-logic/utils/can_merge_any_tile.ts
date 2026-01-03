import type { Tile } from '../tile-class';

export const can_merge_any_tile = (board: Tile[][]): boolean => {
  return board.some((row, y) =>
    row.some((cell, x) => {
      if (!cell) return false;

      const canMergeInRow = cell.value === row[x + 1]?.value;

      const canMergeInColumn = cell.value === board[y + 1]?.[x].value;

      return canMergeInRow || canMergeInColumn;
    })
  );
};
