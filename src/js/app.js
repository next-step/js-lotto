import { Lotto } from "./lotto.js";
import { isValidPurchaseAmount } from "./utils.js";

const ERROR_MESSAGE = "1,000원 단위로 입력하세요.";
const AMOUNT_UNIT = 1000;

const $purchaseAmount = document.querySelector("[data-cy='purchase-amount']");
const $purchaseButton = document.querySelector("[data-cy='purchase-button']");
const $purchaseNumbers = document.querySelector("[data-cy='purchase-numbers']");

const $toggleButton = document.querySelector(".lotto-numbers-toggle-button");
const $switch = document.querySelector(".switch");
const $winningNumberForm = document.querySelector(".winning-number-form");

export class App {
  constructor() {
    $purchaseButton.addEventListener("click", (event) => {
      this.onPurchase();
    });

    $toggleButton.addEventListener("click", (event) => {
      const checked = event.target.checked;
      this.viewLottoNumbers(checked);
    });
  }

  onPurchase() {
    if (!isValidPurchaseAmount($purchaseAmount.value)) {
      alert(ERROR_MESSAGE);
    }

    const purchaseNumbers = $purchaseAmount.value / AMOUNT_UNIT;
    $purchaseNumbers.textContent = `총 ${purchaseNumbers}개를 구매하였습니다.`;

    const lotto = new Lotto(purchaseNumbers);
    lotto.issue();

    $switch.classList.add("show");
    $winningNumberForm.classList.add("show");
  }

  viewLottoNumbers(checked) {
    const $lottoNumbers = document.querySelectorAll(".lotto-number");
    for (const numbers of $lottoNumbers) {
      numbers.style.display = checked ? "block" : "none";
    }
  }
}
