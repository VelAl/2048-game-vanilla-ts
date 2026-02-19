import { SS_KEY_GAME_STATE } from '../../constants';
import type {
  T_GameBoard,
  T_PersistedState,
  T_PersistStateManager,
} from '../../types';
import {
  board_to_saved,
  validate_saved_state,
} from '../utils';

export class SS_GameStateManager implements T_PersistStateManager {
  /**
   * Saves the game state to sessionStorage
   * @param state - The game state to save
   */
  saveState(state: { board: T_GameBoard; score: number; bestScore: number }) {
    sessionStorage.setItem(
      SS_KEY_GAME_STATE,
      JSON.stringify({
        board: board_to_saved(state.board),
        score: state.score,
        bestScore: state.bestScore,
      })
    );
  }

  getSavedState(): T_PersistedState | undefined {
    let savedState: T_PersistedState | undefined;

    try {
      const savedStateString = sessionStorage.getItem(SS_KEY_GAME_STATE);

      if (savedStateString) {
        const parsedState = JSON.parse(savedStateString);

        if (validate_saved_state(parsedState)) {
          savedState = parsedState;
        }
      }
    } catch (error) {
      console.error(
        'Error managing 2048 game saved state in sessionStorage:',
        error
      );
    } finally {
      return savedState;
    }
  }
}
