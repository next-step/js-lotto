import View from './View.js';
import { $ } from '../utils.js';

export default class LottoListView extends View {
  constructor(element = $('#lotto-list')) {
    super(element);
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

  show(lottoNumbers = [], isShowingNumbers) {
    this.element.innerHTML = isShowingNumbers ? this.#getListWithNumbers(lottoNumbers) : this.#getList(lottoNumbers);
  }
}
