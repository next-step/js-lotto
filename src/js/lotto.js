import { getRandomNumbers, shuffle } from "./utils.js";

const $lottoIcons = document.querySelector(".lotto-icons");
export class Lotto {
  static MAX = 45;
  static SIZE = 6;
}

export class LottoTicket {
  purchaseNumbers = 0;

  constructor(purchaseNumbers) {
    this.purchaseNumbers = purchaseNumbers;
  }

  issue() {
    const lottoIcon = Array.from({ length: this.purchaseNumbers })
      .map(
        () => `
      <div class="mx-1 text-4xl" style="display:flex">
        <span data-cy="lotto-icon">🎟️ </span>
        <span class="lotto-number" style="display:none">${this.issueLottoNumbers()}</span>
      </div>
    `
      )
      .join("");

    $lottoIcons.insertAdjacentHTML("afterbegin", lottoIcon);
  }

  issueLottoNumbers() {
    const numbers = getRandomNumbers(Lotto.MAX);
    return shuffle(numbers, Lotto.SIZE);
  }
}
