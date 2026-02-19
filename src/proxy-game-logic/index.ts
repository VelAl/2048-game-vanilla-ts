import type { T_PersistStateManager } from '../types';
import { LS_GameStateManager } from '../persist-state-managers';
import { GameLogicProxy } from './proxy';

const persistStateManagers: Record<string, T_PersistStateManager> = {
  localStorage: new LS_GameStateManager(),
} as const;

/**
 * Factory that injects a persist state manager into the game proxy. Default: localStorage.
 */
const createGameLogicProxy = (
  persistStateManager: keyof typeof persistStateManagers = 'localStorage'
): GameLogicProxy => {
  const manager =
    persistStateManagers[persistStateManager] ||
    persistStateManagers.localStorage;

  return new GameLogicProxy(manager);
};

export default createGameLogicProxy;
