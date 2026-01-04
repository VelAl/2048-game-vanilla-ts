import type { T_BoardLine } from '../../types';
import type { Tile } from '../tile-class';

type T_ShiftAndMergeLine = (cellsLine: T_BoardLine) => {
  newLine: T_BoardLine;
  isShiftedOrMerged: boolean;
  scoreIncrement: number;
  tilesToRemove: Tile[];
};

export const shift_and_merge_line: T_ShiftAndMergeLine = (cellsLine) => {
  let scoreIncrement = 0;
  const tilesToRemove: Tile[] = [];

  // shift line deleting null cells_______________________________
  const lineTiles = cellsLine.filter((cell) => !!cell);

  if (!lineTiles.length) {
    return {
      newLine: cellsLine,
      isShiftedOrMerged: false,
      scoreIncrement,
      tilesToRemove,
    };
  }

  const isShifted = cellsLine.some((cell, i) => !cell && cellsLine[i + 1]);

  // merge tiles if they have the same value______________________
  let skipNext = false; // tiles can be merged only once per move_

  let isMerged = false;
  const mergedLine: T_BoardLine = lineTiles.reduce((akk, tile) => {
    const should_merge = tile.value === akk.at(-1)?.value && !skipNext;

    if (should_merge) {
      isMerged = true;
      tile.doubble();
      scoreIncrement += tile.value;

      const tileToRemove = akk.at(-1)!;
      tileToRemove.mergedWith(tile);
      tilesToRemove.push(tileToRemove);

      akk[akk.length - 1] = tile;
      skipNext = true;
    } else {
      akk.push(tile);
      skipNext = false;
    }
    return akk;
  }, [] as Tile[]);

  // add null cells to the end of the line________________________
  while (mergedLine.length < cellsLine.length) {
    mergedLine.push(null);
  }

  return {
    newLine: mergedLine,
    isShiftedOrMerged: isShifted || isMerged,
    scoreIncrement,
    tilesToRemove,
  };
};
