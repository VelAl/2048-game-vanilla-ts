import { MOVEMENT_DURATION } from '../constants';
import { Game2048State } from '../game-logic';
import { isArrowBtnKey, WARN_DIRECT_MAKE_MOVE } from './utils';
import { LS_GameStateManager } from './local-storage-manager';

let instance: GameLogicProxy | null = null;

/**
 * GameLogicProxy wraps Game2048State to provide enhanced functionality:
 *
 * - Implements the Singleton pattern to ensure only one game instance exists.
 * - Persists game state to LocalStorage automatically after each move.
 * - Handles keyboard input, accepting only arrow keys.
 * - Locks move execution while tile movement animations are in progress.
 * - Prevents direct calls to `makeMove()`; moves should go through `handleKeyDown`.
 */
export class GameLogicProxy extends Game2048State {
  private LS_state_manager: LS_GameStateManager | null = null;
  private moveTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (instance) return instance;

    const LS_state_manager = new LS_GameStateManager();
    super(LS_state_manager.savedState);
    this.LS_state_manager = LS_state_manager;

    instance = this;
  }

  public handleKeyDown(e: KeyboardEvent): boolean {
    if (!isArrowBtnKey(e.key)) return false;
    if (this.moveTimeout) return false;

    const isMoveMade = super.make_move(e.key);

    if (!isMoveMade) {
      return false;
    } else {
      this.moveTimeout = setTimeout(() => {
        this.moveTimeout = null;
      }, MOVEMENT_DURATION);

      this.LS_state_manager!.saveState(this.gameState);

      return true;
    }
  }

  public startNewGame(): void {
    super.startNewGame();
    this.LS_state_manager!.saveState(this.gameState);
  }

  public makeMove() {
    console.error(WARN_DIRECT_MAKE_MOVE);
  }
}
