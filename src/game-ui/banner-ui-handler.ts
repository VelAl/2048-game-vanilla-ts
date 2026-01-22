import { gameStatus } from '../constants';
import type { T_GameStatus } from '../types';

export class BannerUiHandler {
  #bannerElement: HTMLElement;

  constructor() {
    this.#bannerElement = document.getElementById('banner')!;
  }

  private showMessage({
    title,
    subtitle,
    stateClass,
  }: {
    title: string;
    subtitle: string;
    stateClass: 'is-win' | 'is-lost';
  }) {
    this.#bannerElement.innerHTML = `
      <span class="banner-title">${title}</span>
      <span class="banner-subtitle">${subtitle}</span>
    `;

    this.#bannerElement.classList.remove('is-win', 'is-lost');
    this.#bannerElement.classList.add('is-visible', stateClass);
  }

  private clearMessage() {
    this.#bannerElement.innerHTML = '';
    this.#bannerElement.classList.remove('is-visible', 'is-win', 'is-lost');
  }

  updateBanner(status: T_GameStatus) {
    if (status === gameStatus.WON) {
      this.showMessage({
        title: 'You win! 🎉',
        subtitle:
          'Victory lap time—keep going or restart to chase bigger tiles.',
        stateClass: 'is-win',
      });
      return;
    }

    if (status === gameStatus.LOST) {
      this.showMessage({
        title: 'Game over',
        subtitle: 'No moves left. Hit restart and climb back up!',
        stateClass: 'is-lost',
      });
      return;
    }

    this.clearMessage();
  }
}
