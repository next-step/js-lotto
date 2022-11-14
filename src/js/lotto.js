import { getRandomNumbers } from "./utils.js";

const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;
const LOTTO_NUMBER_COUNT = 6;
const $lottoIcons = document.querySelector(".lotto-icons");

export class Lotto {
  purchaseNumbers = 0;

  constructor(purchaseNumbers) {
    this.purchaseNumbers = purchaseNumbers;
  }

  issue() {
    let i;
    let lottoIcon = "";
    for (i = 0; i < this.purchaseNumbers; i++) {
      lottoIcon += `<div class="mx-1 text-4xl" style="display:flex">
        <span data-cy="lotto-icon">🎟️ </span>
        <span class="lotto-number" style="display:none">${this.issueLottoNumbers()}</span>
        </div>
      `;
    }

    $lottoIcons.insertAdjacentHTML("afterbegin", lottoIcon);
  }

  issueLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < LOTTO_NUMBER_COUNT) {
      numbers.add(getRandomNumbers(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER));
    }
    return Array.from(numbers.keys()).join(", ");
  }
}
