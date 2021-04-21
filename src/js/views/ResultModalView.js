import View from './View.js';
import { $, $$ } from '../utils/dom.js';

export default class ResultModalView extends View {
  constructor($element) {
    super($element);
    this.bindModalCloseEvent();
  }

  showModal(rankCounts, earningRate) {
    this.$element.classList.add('open');

    this.renderRanks(rankCounts);
    this.renderEarningRate(earningRate);
  }

  renderRanks(rankCounts) {
    $$('.match-count').forEach((el, idx) => {
      el.innerText = rankCounts[rankCounts.length - idx - 1];
    });
  }

  renderEarningRate(earningRate) {
    $('#profit').innerText = earningRate;
  }

  bindModalCloseEvent() {
    $('.modal-close').addEventListener('click', () => this.closeModal());
    $('.modal').addEventListener('click', ({ currentTarget, target }) => {
      if (currentTarget === target) {
        this.closeModal();
      }
    });

    $('#reset-btn').addEventListener('click', () => this.onResetBtnHandler());
  }

  closeModal() {
    this.$element.classList.remove('open');
  }

  onResetBtnHandler() {
    this.closeModal();
    this.emit('clickResetBtn');
  }
}
