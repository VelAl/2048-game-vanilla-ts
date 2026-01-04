export const gridSize = 4;

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
  2: { backgroundColor: '#eee4da', color: '#776e65' },
  4: { backgroundColor: '#ede0c8', color: '#776e65' },
  8: { backgroundColor: '#f2b179', color: '#f9f6f2' },
  16: { backgroundColor: '#f59563', color: '#f9f6f2' },
  32: { backgroundColor: '#f67c5f', color: '#f9f6f2' },
  64: { backgroundColor: '#f65e3b', color: '#f9f6f2' },
  128: { backgroundColor: '#edcf72', color: '#f9f6f2' },
  256: { backgroundColor: '#edcc61', color: '#f9f6f2' },
  512: { backgroundColor: '#edc850', color: '#f9f6f2' },
  1024: { backgroundColor: '#edc53f', color: '#f9f6f2' },
  2048: { backgroundColor: '#edc22e', color: '#f9f6f2' },
};
