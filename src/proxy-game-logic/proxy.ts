import { MOVEMENT_DURATION } from '../constants';
import { Game2048State } from '../game-logic';
import { isArrowBtnKey, WARN_DIRECT_MAKE_MOVE } from './utils';
import type { T_Direction, T_PersistStateManager } from '../types';

let instance: GameLogicProxy | null = null;

/**
 * GameLogicProxy wraps Game2048State to provide enhanced functionality:
 *
 * - Implements the Singleton pattern to ensure only one game instance exists.
 * - Uses a persist state manager to persist game state automatically after each move.
 * - Handles keyboard input, accepting only arrow keys.
 * - Locks move execution while tile movement animations are in progress.
 * - Prevents direct calls to `make_move()`; moves should go through `handleKeyDown`.
 */
export class GameLogicProxy extends Game2048State {
  private persistStateManager!: T_PersistStateManager;
  private moveTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(persistStateManager: T_PersistStateManager) {
    if (instance) return instance;

    super(persistStateManager.getSavedState());
    this.persistStateManager = persistStateManager;
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

      this.persistStateManager.saveState(this.gameState);

      return true;
    }
  }

  public startNewGame(): void {
    if (this.moveTimeout) {
      clearTimeout(this.moveTimeout);
      this.moveTimeout = null;
    }

    super.startNewGame();
    this.persistStateManager.saveState(this.gameState);
  }

  public make_move(_: T_Direction): boolean {
    console.error(WARN_DIRECT_MAKE_MOVE);
    return false;
  }
}
