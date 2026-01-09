import type { T_Direction } from '../types';
import { directions } from '../constants';

export const isArrowBtnKey = (key: string): key is T_Direction =>
  Object.values(directions).includes(key as T_Direction);
