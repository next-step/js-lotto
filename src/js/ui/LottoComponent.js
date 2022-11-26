import { AMOUNT_UNIT } from '../constants.js';
import {
  $lottoIcons,
  $purchaseAmount,
  $purchaseLotto,
  $purchaseNumbers,
} from '../dom.js';

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
