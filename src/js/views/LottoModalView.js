import View from './View.js';
import { $ } from '../utils.js';
import { LOTTO_PRICE, PRIZE_MONEY } from '../constant.js';

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

  #renderPrizeCount(reward) {
    Object.keys(reward).forEach((rank) => {
      const $rank = $(`[data-rank=${rank.toLowerCase()}]`);
      return ($rank.textContent = reward[rank]);
    });
  }

  #renderEarningRate(reward, lottoNumbers) {
    const $earningRate = $('#earning-rate');
    const quantity = lottoNumbers.length;
    const totalPrizeMoney = Object.keys(reward).reduce((acc, rank) => {
      const prizeMoney = PRIZE_MONEY[rank];
      const count = reward[rank];
      return acc + prizeMoney * count;
    }, 0);
    const earningRate = (totalPrizeMoney / (quantity * LOTTO_PRICE)) * 100;
    $earningRate.textContent = earningRate;
  }

  show(isModalOpen = false, reward, lottoNumbers) {
    if (!isModalOpen) return super.hide();

    super.show();
    this.#renderPrizeCount(reward);
    this.#renderEarningRate(reward, lottoNumbers);
  }
}
