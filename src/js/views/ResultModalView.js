import { LOTTO_PRICES } from '../util/Constans.js';
import { delegate, qs } from '../util/helper.js';
import View from './View.js';

export default class ResultModalView extends View {
  constructor() {
    super(qs('#modal'));
    this.template = new Template();

    this.bindEvent();
  }

  bindEvent() {
    delegate(this.element, 'click', 'svg', () => this.handleClick());
    delegate(this.element, 'click', '.close-x', () => this.handleClick());
    delegate(this.element, 'click', '#reset-btn', () => this.handleReset());
  }

  handleClick() {
    this.emit('@closeModal');
  }

  handleReset() {
    this.emit('@reset');
  }

  toggleModal(winnerInfo) {
    this.element.innerHTML = winnerInfo && this.template.getModal(winnerInfo);
    this.element.classList.toggle('open');
  }
}

class Template {
  getModal({ winnerCount, profitRate }) {
    return `
    <div class="modal-inner p-10">
    <div class="modal-close" id="modal-close">
      <svg viewbox="0 0 40 40">
        <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </div>
    
    <h2 class="text-center">🏆 당첨 통계 🏆</h2>
    <div class="d-flex justify-center">
      <table class="result-table border-collapse border border-black" id="modal-table">
        <thead>
          <tr class="text-center">
            <th class="p-3">일치 갯수</th>
            <th class="p-3">당첨금</th>
            <th class="p-3">당첨 갯수</th>
          </tr>
        </thead>
        <tbody>
          ${LOTTO_PRICES.map((lottoPrice, idx) =>
            this._getItem(lottoPrice, winnerCount, idx)
          ).join('')}
        </tbody>
      </table>
    </div>
    <p class="text-center font-bold" id="modal-profit-rate">당신의 총 수익률은 ${profitRate} %입니다.</p>
    <div class="d-flex justify-center mt-5">
      <button type="button" class="btn btn-cyan" id="reset-btn">다시 시작하기</button>
    </div>
    </div> 
    `;
  }

  _getItem({ matchNumberCount, price }, winnerCount, idx) {
    return `
      <tr class="text-center">
          <td class="p-3">${
            idx === 3
              ? `${matchNumberCount}개 + 보너스볼`
              : `${matchNumberCount}개`
          }</td>
          <td class="p-3" id="modal-price">${price.toLocaleString()}</td>
          <td class="p-3" id="modal-count">${winnerCount[idx]}개</td>
      </tr>
    `;
  }
}

{
  /* <div class="modal-inner p-10">
<div class="modal-close">
  <svg viewbox="0 0 40 40">
    <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>
</div>

<h2 class="text-center">🏆 당첨 통계 🏆</h2>
<div class="d-flex justify-center">
  <table class="result-table border-collapse border border-black">
    <thead>
      <tr class="text-center">
        <th class="p-3">일치 갯수</th>
        <th class="p-3">당첨금</th>
        <th class="p-3">당첨 갯수</th>
      </tr>
    </thead>
    <tbody>
      <tr class="text-center">
        <td class="p-3">3개</td>
        <td class="p-3">5,000</td>
        <td class="p-3">n개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">4개</td>
        <td class="p-3">50,000</td>
        <td class="p-3">n개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">5개</td>
        <td class="p-3">1,500,000</td>
        <td class="p-3">n개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">5개 + 보너스볼</td>
        <td class="p-3">30,000,000</td>
        <td class="p-3">n개</td>
      </tr>
      <tr class="text-center">
        <td class="p-3">6개</td>
        <td class="p-3">2,000,000,000</td>
        <td class="p-3">n개</td>
      </tr>
    </tbody>
  </table>
</div>
<p class="text-center font-bold">당신의 총 수익률은 %입니다.</p>
<div class="d-flex justify-center mt-5">
  <button type="button" class="btn btn-cyan">다시 시작하기</button>
</div>
</div> */
}
