import type { T_BoardLine } from '../../types';
import type { Tile } from '../tile-class';

type T_ShiftAndMergeLine = (cellsLine: T_BoardLine) => {
  newLine: T_BoardLine;
  isShiftedOrMerged: boolean;
  scoreIncrement: number;
};

export const shift_and_merge_line: T_ShiftAndMergeLine = (cellsLine) => {
  let scoreIncrement = 0;

  // shift line deleting null cells_______________________________
  const shiftedLine = cellsLine.filter((cell) => !!cell);

  if (!shiftedLine.length) {
    // if the cellsLine has no tiles
    return { newLine: cellsLine, isShiftedOrMerged: false, scoreIncrement };
  }

  const isShifted = cellsLine.length !== shiftedLine.length;

  // merge tiles if they have the same value______________________
  let skipNext = false; // tiles can be merged only once per move_

  const mergedLine: T_BoardLine = shiftedLine.reduce((akk, tile) => {
    const should_merge = tile.value === akk.at(-1)?.value && !skipNext;

    if (should_merge) {
      tile.doubble();
      scoreIncrement += tile.value;

      akk[akk.length - 1] = tile;
      skipNext = true;
    } else {
      akk.push(tile);
      skipNext = false;
    }
    return akk;
  }, [] as Tile[]);

  const isMerged = mergedLine.length !== shiftedLine.length;

  // add null cells to the end of the line________________________
  while (mergedLine.length < cellsLine.length) {
    mergedLine.push(null);
  }

  return {
    newLine: mergedLine,
    isShiftedOrMerged: isShifted || isMerged,
    scoreIncrement,
  };
};
