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

export const directionsSet = new Set(Object.values(directions));
