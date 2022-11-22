import { getNumberList, shuffle } from './utils.js';
import {
  $lottoIcons,
  $purchaseAmount,
  $purchaseLotto,
  $purchaseNumbers,
} from './dom.js';
import { AMOUNT_UNIT, ERROR_MESSAGE } from './constants.js';

export class LottoModel {
  static #MAX = 45;
  static #SIZE = 6;
  numbers = [];

  validate() {
    if ($purchaseAmount.value === '') {
      return ERROR_MESSAGE.REQUIRED;
    }

    if (!this.isValidPurchaseAmount($purchaseAmount.value)) {
      return ERROR_MESSAGE.INVALID;
    }
  }

  generateLottoNumbers(purchaseNumbers) {
    this.numbers = Array.from({ length: purchaseNumbers }).map(() =>
      shuffle(getNumberList(LottoModel.#MAX), LottoModel.#SIZE)
    );
  }

  resetLottoNumber() {
    this.numbers = [];
  }

  isValidPurchaseAmount(purchaseAmount) {
    return purchaseAmount > 0 && purchaseAmount % AMOUNT_UNIT === 0;
  }
}

export class LottoComponent {
  constructor(lotto) {
    this.render(lotto.numbers);
  }

  render(lottoNumbers) {
    this.showPurchaseNumber();
    $lottoIcons.replaceChildren();
    const lottoIcon = lottoNumbers
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

  showPurchaseNumber() {
    const purchaseNumbers = $purchaseAmount.value / AMOUNT_UNIT;
    $purchaseNumbers.textContent = `총 ${purchaseNumbers}개를 구매하였습니다.`;
    $purchaseLotto.style.display = 'block';
  }
}
