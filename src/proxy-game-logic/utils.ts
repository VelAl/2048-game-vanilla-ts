import type { T_Direction } from '../types';
import { directions } from '../constants';

export const isArrowBtnKey = (key: string): key is T_Direction =>
  Object.values(directions).includes(key as T_Direction);

export const throttle = <T, K>(func: (...args: T[]) => K, delay: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T[]) {
    if (timeout) return;

    timeout = setTimeout(() => {
      timeout = null;
    }, delay);

    return func(...args);
  };
};

export const WARN_DIRECT_MAKE_MOVE =
  '"makeMove" method should not be used directly on the proxy class. Use "handleKeyDown" instead.';
