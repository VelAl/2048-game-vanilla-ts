import { BOARD_SIZE } from '../constants';
import type { T_GameBoard, T_PersistedState, T_SavedBoard } from '../types';

export const validate_saved_state = (
  savedState: unknown
): savedState is T_PersistedState => {
  if (!savedState || typeof savedState !== 'object') return false;

  const state = savedState as T_PersistedState;

  if (typeof state.score !== 'number' || typeof state.bestScore !== 'number')
    return false;

  if (!Array.isArray(state.board)) return false;

  for (const row of state.board) {
    if (!Array.isArray(row)) return false;

    for (const cell of row) {
      if (typeof cell !== 'number' && cell !== null) return false;
    }
  }

  if (state.board.length !== BOARD_SIZE) return false;
  if (state.board.some((row) => row.length !== BOARD_SIZE)) return false;

  return true;
};

/** T_GameBoard → T_SavedBoard for persistence */
export const board_to_saved = (
  board: T_GameBoard
): T_SavedBoard => board.map((row) => row.map((cell) => cell?.value || null));
