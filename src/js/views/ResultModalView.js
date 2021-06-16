import View from './View.js';
import { $, setLocaleString } from '../utils/utils.js';
import { PRICE } from '../utils/constants.js';

export default class ResultModalView extends View {
  constructor(el) {
    super(el);
    this.bindEvents();
  }

  openModal(priceInfo, lottoYield) {
    this.onModalShow();
    $('#result-table-body').innerHTML = this.renderWinnerPrice(priceInfo);
    $('#total-price').innerHTML = this.renderTotalYield(lottoYield);
  }

  bindEvents() {
    $('.modal-close').addEventListener('click', () => this.onModalClose());

    this.el.addEventListener('click', ({ currentTarget, target }) => {
      if (currentTarget !== target) return;
      this.onModalClose();
    });

    $('#reset').addEventListener('click', () => {
      this.onResetLotto();
    });
  }

  onModalShow() {
    this.el.classList.add('open');
  }

  onModalClose() {
    this.el.classList.remove('open');
  }

  onResetLotto() {
    this.onModalClose();
    this.emit('@resetLotto');
  }

  renderTotalYield(lottoYield) {
    return `당신의 총 수익률은 ${lottoYield}%입니다.`;
  }

  renderWinnerPrice(priceInfo) {
    return [...priceInfo].reduce((html, rankInfo) => {
      const { match, money, count } = rankInfo;
      return (html += `
        <tr class="text-center">
          <td class="p-3">${match}</td>
          <td class="p-3">${setLocaleString(money)}</td>
          <td class="p-3">${count}개</td>
        </tr>
      `);
    }, '');
  }
}
