import { getRandomNumbers, shuffle } from './utils.js';
import { $lottoIcons } from './dom.js';

export class LottoModel {
  #MAX = 45;
  #SIZE = 6;
  numbers = [];
  purchaseNumbers = 0;

  constructor(purchaseNumbers) {
    this.purchaseNumbers = purchaseNumbers;
    this.generateLottoNumbers();
  }

  generateLottoNumbers() {
    this.numbers = Array.from({ length: this.purchaseNumbers }).map(() =>
      shuffle(getRandomNumbers(this.#MAX), this.#SIZE)
    );
  }

  resetLottoNumber() {
    this.numbers = [];
    this.purchaseNumbers = 0;
  }
}

export class LottoComponent {
  lottoNumbers = [];
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
  }

  render() {
    $lottoIcons.replaceChildren();
    const lottoIcon = this.lottoNumbers
      .map(
        (number) => `
      <div class="mx-1 text-4xl" style="display:flex">
        <span data-cy="lotto-icon">🎟️ </span>
        <span class="lotto-number" style="display:none">${number}</span>
      </div>
    `
      )
      .join('');

    $lottoIcons.insertAdjacentHTML('afterbegin', lottoIcon);
  }
}
