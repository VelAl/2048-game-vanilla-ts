import { LS_KEY_GAME_STATE } from '../../constants';
import type {
  T_GameBoard,
  T_PersistedState,
  T_PersistStateManager,
} from '../../types';
import { convert_game_board_to_ls_board, validate_saved_state } from './utils';

export class LS_GameStateManager implements T_PersistStateManager {
  /**
   * Saves the game state to localStorage
   * @param state - The game state to save
   */
  saveState(state: { board: T_GameBoard; score: number; bestScore: number }) {
    localStorage.setItem(
      LS_KEY_GAME_STATE,
      JSON.stringify({
        board: convert_game_board_to_ls_board(state.board),
        score: state.score,
        bestScore: state.bestScore,
      })
    );
  }

  getSavedState(): T_PersistedState | undefined {
    let savedState: T_PersistedState | undefined;

    try {
      const savedStateString = localStorage.getItem(LS_KEY_GAME_STATE);

      if (savedStateString) {
        const parsedState = JSON.parse(savedStateString);

        if (validate_saved_state(parsedState)) {
          savedState = parsedState;
        }
      }
    } catch (error) {
      console.error(
        'Error managing 2048 game saved state in localStorage:',
        error
      );
    } finally {
      return savedState;
    }
  }
}
