import View from './View.js';
import { $ } from '../utils.js';

export default class LottoModalView extends View {
  constructor(element = $('.modal')) {
    super(element);
    this.closeButton = $('.modal-close');
    this.resetButton = $('#reset-button');
    super.hide();
    this.bindEvents();
  }

  bindEvents() {
    this.closeButton.addEventListener('click', () => this.handleClose());
    this.resetButton.addEventListener('click', () => this.handleReset());
  }

  handleClose() {
    this.emit('@click');
  }

  handleReset() {
    this.emit('@reset');
  }

  show(isModalOpen = false, reward) {
    isModalOpen ? super.show() : super.hide();
    if (isModalOpen) {
      Object.keys(reward).forEach((rank) => {
        const $rank = $(`[data-rank=${rank.toLowerCase()}]`);
        return ($rank.textContent = reward[rank]);
      });
    }
  }
}
