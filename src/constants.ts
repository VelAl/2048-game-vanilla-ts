export const BOARD_SIZE = 4;

export const gameStatus = {
  IDLE: 'idle',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
} as const;

export const directions = {
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
} as const;

export const tileColors = {
  2: { backgroundColor: '#e6dccf', color: '#6f665e' },
  4: { backgroundColor: '#e3d1b3', color: '#6f665e' },
  8: { backgroundColor: '#f0a85c', color: '#ffffff' },
  16: { backgroundColor: '#f28c45', color: '#ffffff' },
  32: { backgroundColor: '#f26d4f', color: '#ffffff' },
  64: { backgroundColor: '#f04f2a', color: '#ffffff' },
  128: { backgroundColor: '#e6c65c', color: '#ffffff' },
  256: { backgroundColor: '#e3bf47', color: '#ffffff' },
  512: { backgroundColor: '#e0b832', color: '#ffffff' },
  1024: { backgroundColor: '#ddb020', color: '#ffffff' },
  2048: { backgroundColor: '#d9a600', color: '#ffffff' },
};
