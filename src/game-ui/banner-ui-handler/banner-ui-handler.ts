import { gameStatus } from '../../constants';
import type { T_GameStatus } from '../../types';
import { banner_data, type T_BannerData } from './utils';

export class BannerUiHandler {
  private readonly bannerElement: HTMLElement;

  constructor() {
    this.bannerElement = document.getElementById('banner')!;
  }

  private showMessage(data: T_BannerData) {
    this.bannerElement.innerHTML = `
      <span class="banner-title">${data.title}</span>
      <span class="banner-subtitle">${data.subtitle}</span>
    `;

    this.bannerElement.classList.remove('is-win', 'is-lost');
    this.bannerElement.classList.add('is-visible', data.stateClass);
  }

  private clearMessage() {
    this.bannerElement.innerHTML = '';
    this.bannerElement.classList.remove('is-visible', 'is-win', 'is-lost');
  }

  updateBanner(status: T_GameStatus) {
    if (status === gameStatus.WON || status === gameStatus.LOST) {
      return this.showMessage(banner_data[status]);
    }

    this.clearMessage();
  }
}
