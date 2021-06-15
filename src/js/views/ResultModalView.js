import View from './View.js';
import { $ } from '../utils/utils.js';
import { PRICE } from '../utils/constants.js';

export default class ResultModalView extends View {
  constructor(el) {
    super(el);
    this.bindEvents();
  }

  openModal(lottoRank, lottoCount) {
    this.onModalShow();
    this.lottoPurchaseMoney = lottoCount * 1000;
    this.totalPriceMoney = 0;
    $('#result-table-body').innerHTML = this.renderWinnerPrice(lottoRank);
    this.renderTotalPrice();
  }

  // renderTotalPrice() {
  //   console.log(this.totalPriceMoney);
  //   console.log(this.lottoPurchaseMoney);
  //   const percent = Math.floor((this.totalPriceMoney - this.lottoPurchaseMoney) / 100);
  //   console.log(percent);
  //   return `
  //     당신의 총 수익률은 ${percent}%입니다.
  //   `;
  // }

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

  renderWinnerPrice(lottos) {
    return [...Object.keys(lottos)].reverse().reduce((html, rank) => {
      const { match, money } = PRICE.find((priceInfo) => priceInfo.rank === Number(rank));
      const count = lottos[rank];
      this.totalPriceMoney = this.totalPriceMoney + count * money;
      return (html += `
        <tr class="text-center">
          <td class="p-3">${match}개</td>
          <td class="p-3">${money}</td>
          <td class="p-3">${count}개</td>
        </tr>
      `);
    }, '');
  }
}
