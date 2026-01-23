import { gameStatus } from '../../constants';

export const banner_data = {
  [gameStatus.WON]: {
    title: 'You win! 🎉',
    subtitle: 'Victory lap time—keep going or restart to chase bigger tiles.',
    stateClass: 'is-win',
  },
  [gameStatus.LOST]: {
    title: 'Game over',
    subtitle: 'No moves left. Hit restart and climb back up!',
    stateClass: 'is-lost',
  },
} as const;

export type T_BannerData = (typeof banner_data)[keyof typeof banner_data];
