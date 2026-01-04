import { directions, BOARD_SIZE } from '../../constants';
import type { T_Direction } from '../../types';

type T_CoordTuple = [number, number];
type T_LinesIndexes = T_CoordTuple[];

export const directions_to_line_indexes = {
  [directions.DOWN]: () => {
    const result = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      let line = [];
      for (let y = BOARD_SIZE - 1; y >= 0; y--) {
        line.push([y, x]);
      }

      result.push(line);
    }

    return result as T_LinesIndexes[];
  },
  [directions.UP]: () => {
    const result = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      let line = [];
      for (let y = 0; y < BOARD_SIZE; y++) {
        line.push([y, x]);
      }

      result.push(line);
    }

    return result as T_LinesIndexes[];
  },
  [directions.RIGHT]: () => {
    const result = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      let line = [];
      for (let x = BOARD_SIZE - 1; x >= 0; x--) {
        line.push([y, x]);
      }

      result.push(line);
    }

    return result as T_LinesIndexes[];
  },
  [directions.LEFT]: () => {
    const result = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      let line = [];
      for (let x = 0; x < BOARD_SIZE; x++) {
        line.push([y, x]);
      }

      result.push(line);
    }

    return result as T_LinesIndexes[];
  },
};

export const get_line_indexes_by_direction = (
  direction: T_Direction
): T_LinesIndexes[] => {
  return directions_to_line_indexes[direction]();
};
