import View from './View.js';
import { $ } from '../utils.js';
import { LOTTO_PRICE, PRIZE_MONEY } from '../constant.js';

export class LottoModalView extends View {
  constructor(element = $('.modal')) {
    super(element);
    this.isModalOpen = false;
    this.closeButton = $('.modal-close');
    this.resetButton = $('#reset-button');

    this.bindEvents();
  }

  bindEvents() {
    this.closeButton.addEventListener('click', () => this.#handleClose());
    this.resetButton.addEventListener('click', () => this.#handleReset());
  }

  #handleClose() {
    this.emit('@click');
  }

  #handleReset() {
    this.emit('@reset');
  }

  #renderPrizeCount(reward) {
    Object.keys(reward).forEach((rank) => {
      const $rank = $(`[data-rank="${rank.toLowerCase()}"]`);
      return ($rank.textContent = reward[rank]);
    });
  }

  #calculateEachPrizeMoney = (reward) => (acc, rank) => {
    const prizeMoney = PRIZE_MONEY[rank];
    const count = reward[rank];
    return acc + prizeMoney * count;
  };

  #renderEarningRate(reward, lottoNumbers) {
    const $earningRate = $('#earning-rate');
    const quantity = lottoNumbers.length;
    const totalPrizeMoney = Object.keys(reward).reduce(this.#calculateEachPrizeMoney(reward), 0);
    const earningRate = (totalPrizeMoney / (quantity * LOTTO_PRICE)) * 100;
    $earningRate.textContent = earningRate;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  show(reward, lottoNumbers) {
    if (!this.isModalOpen) return this.hide();

    super.show();
    this.#renderPrizeCount(reward);
    this.#renderEarningRate(reward, lottoNumbers);
  }
}
