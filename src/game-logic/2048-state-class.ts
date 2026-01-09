import { gameStatus } from '../constants';
import {
  type T_GameStatus,
  type T_GameBoard,
  type T_Direction,
  type T_LS_State,
} from '../types';
import { Tile } from './tile-class';
import {
  board_has_won_tile,
  can_merge_any_tile,
  generate_empty_board,
  get_empty_cells_coords,
  get_line_indexes_by_direction,
  is_move_forbidden,
  shift_and_merge_line,
} from './utils';

export class Game2048State {
  #board: T_GameBoard;
  #status: T_GameStatus = gameStatus.IDLE;
  #score: number = 0;
  #bestScore: number = 0;

  constructor(initialState?: T_LS_State) {
    this.#board = generate_empty_board();

    if (initialState) {
      initialState.board.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            this.#board[y][x] = new Tile({ y, x }, value);
          }
        });
      });

      this.#score = initialState.score;
      this.#bestScore = initialState.bestScore;

      this.#check_status();
    } else {
      this.#set_new_tile();
      this.#set_new_tile();

      this.#status = gameStatus.PLAYING;
    }
  }

  #set_new_tile() {
    const emptyCells = get_empty_cells_coords(this.#board);

    if (!emptyCells.length) {
      console.error('Tried to set new tile in full board');
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { x, y } = emptyCells[randomIndex];
    this.#board[y][x] = new Tile({ y, x });
  }

  make_move(direction: T_Direction) {
    if (is_move_forbidden(this.#status)) {
      console.error('Tried to make move in lost or won state');
      return;
    }

    const lines_with_indexes = get_line_indexes_by_direction(direction);

    let anyTileMoved = false;

    const tilesToRemoveAcc: Tile[] = [];

    lines_with_indexes.forEach((line) => {
      // get board line depending on the direction____________________
      const boardLine = line.map(([y, x]) => this.#board[y][x]);

      const { isShiftedOrMerged, newLine, scoreIncrement, tilesToRemove } =
        shift_and_merge_line(boardLine);

      if (isShiftedOrMerged) {
        anyTileMoved = true;
        this.#addScore(scoreIncrement);

        tilesToRemove.forEach((tile) => {
          tilesToRemoveAcc.push(tile);
        });

        // set the board line with the new values_____________________
        line.forEach(([y, x], i) => {
          const newCell = newLine[i];
          if (newCell) {
            newCell.coords = { y, x };
          }
          this.#board[y][x] = newCell;
        });
      }
    });

    if (anyTileMoved) {
      this.#set_new_tile();

      this.#check_status();

      return {
        tilesToRemove: tilesToRemoveAcc,
      };
    }
  }

  #check_status() {
    if (board_has_won_tile(this.#board)) {
      this.#status = gameStatus.WON;
      return;
    }

    if (!this.#is_any_move_possible) {
      this.#status = gameStatus.LOST;
      return;
    }
  }

  get #is_any_move_possible() {
    const hasEmptyCells = get_empty_cells_coords(this.#board).length > 0;
    if (hasEmptyCells) return true;

    return can_merge_any_tile(this.#board as Tile[][]);
  }

  #addScore(increment: number) {
    this.#score += increment;
    if (this.#score > this.#bestScore) {
      this.#bestScore = this.#score;
    }
  }

  get gameState() {
    return {
      board: this.#board,
      status: this.#status,
      score: this.#score,
      bestScore: this.#bestScore,
    };
  }

  get tiles() {
    return this.#board.flat().filter((tile) => !!tile);
  }
}
