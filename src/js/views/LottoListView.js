import View from './View.js';
import { $ } from '../utils.js';

export class LottoListView extends View {
  constructor(element = $('#lotto-list')) {
    super(element);
    this.isShowingNumbers = false;
  }

  toggleShowNumber(isShowingNumbers) {
    this.isShowingNumbers = isShowingNumbers;
  }

  #getList(winningNumbers) {
    return `
      <ul class="d-flex flex-wrap lotto-ul">
        ${winningNumbers.map(() => `<li class="mx-1 text-4xl">🎟️ </li>`).join('')}
      </ul>`;
  }

  #getListWithNumbers(winningNumbers) {
    return `
      <ul class="d-flex flex-wrap lotto-ul">
        ${winningNumbers
          .map((number) => {
            return `
              <li class="mx-1 text-4xl">
                <span class="lotto-icon">🎟️</span>
                <span class="lotto-numbers">${number.join(',')}</span>
              </li>
              `;
          })
          .join('')}
      </ul>
  `;
  }

  show(lottoNumbers = []) {
    this.element.innerHTML = this.isShowingNumbers
      ? this.#getListWithNumbers(lottoNumbers)
      : this.#getList(lottoNumbers);
  }
}
