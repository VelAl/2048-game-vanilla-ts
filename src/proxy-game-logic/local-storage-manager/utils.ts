import type { T_GameBoard, T_LS_State, T_SavedBoard } from '../../types';

export const validate_saved_state = (
  savedState: unknown
): savedState is T_LS_State => {
  if (!savedState || typeof savedState !== 'object') return false;

  const state = savedState as T_LS_State;

  if (typeof state.score !== 'number' || typeof state.bestScore !== 'number')
    return false;

  if (!Array.isArray(state.board)) return false;

  state.board.forEach((row) => {
    if (!Array.isArray(row)) return false;

    row.forEach((cell) => {
      if (typeof cell !== 'number' && cell !== null) return false;
    });
  });

  return true;
};

/**
 * Converts a game board T_GameBoard to a T_SavedBoard for localStorage
 */
export const convert_game_board_to_ls_board = (
  board: T_GameBoard
): T_SavedBoard => board.map((row) => row.map((cell) => cell?.value || null));
