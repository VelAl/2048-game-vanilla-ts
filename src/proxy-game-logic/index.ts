import type { T_PersistStateManager } from '../types';
import {
  LS_GameStateManager,
  SS_GameStateManager,
} from '../persist-state-managers';
import { GameLogicProxy } from './proxy';

const persistStateManagers: Record<string, new () => T_PersistStateManager> = {
  localStorage: LS_GameStateManager,
  sessionStorage: SS_GameStateManager,
} as const;

/**
 * Factory that injects a persist state manager into the game proxy. Default: localStorage.
 *
 * @param persistStateManager - The persist state manager to use. Default: localStorage.
 * @returns A new instance of the game logic proxy.
 */
const createGameLogicProxy = (
  persistStateManager: keyof typeof persistStateManagers = 'localStorage'
): GameLogicProxy => {
  const Manager =
    persistStateManagers[persistStateManager] ||
    persistStateManagers.localStorage;

  return new GameLogicProxy(new Manager());
};

export default createGameLogicProxy;
