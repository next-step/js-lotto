import { LOTTO, MESSAGES } from "./constants.js";
import LottoController from "./controllers/LottoController.js";
import LottoAnalyticsController from "./controllers/LottoAnalyticsController.js";

//TODO MVC로 변경
class LottoMachine {
  #lottoController;
  #lottoAnalyticsController;

  constructor() {
    this.$purchaseForm = document.getElementById("purchase-form");
    this.$purchaseAmountInput = document.getElementById(
      "purchase-amount-input"
    );
    this.$lastWinningNumbersForm = document.getElementById(
      "last-winning-numbers-form"
    );

    this.#lottoController = new LottoController();
    this.#lottoAnalyticsController = new LottoAnalyticsController();

    this.lottoNumbers = [];
    this.purchasePrice = 0;

    this.#subscribeEvents();
  }

  #subscribeEvents() {
    this.$purchaseForm.addEventListener("submit", this.#onPurchase.bind(this));
    this.$lastWinningNumbersForm.addEventListener(
      "submit",
      this.#onCheckWinningLottoResult.bind(this)
    );
  }

  #onPurchase(event) {
    event.preventDefault();

    const purchasePrice = this.$purchaseAmountInput.value;
    if (this.isUnavailablePurchasePrice(+purchasePrice)) {
      window.alert(MESSAGES.WRONG_PURCHASE_PRICE);
      return;
    }

    if (this.isExceedPurchasePriceLimit(+purchasePrice)) {
      window.alert(MESSAGES.WRONG_PURCHASE_PRICE);
      return;
    }

    this.purchasePrice = purchasePrice;
    const purchaseAmount = this.calculateAmountPer(purchasePrice);

    this.lottoNumbers =
      this.#lottoController.onGenerateLottosBy(purchaseAmount);
    this.$lastWinningNumbersForm.classList.remove("hide"); //TODO 함수로 네이밍 변경
  }

  #onCheckWinningLottoResult(e) {
    e.preventDefault();

    const winningNumbers = this.getWinningNumbers(e.target);
    if (!this.isWinningNumbersCorrectlyRegistered(winningNumbers)) {
      window.alert(MESSAGES.WRONG_LOTTO_NUMBER);
      return;
    }

    this.#lottoAnalyticsController.onAnalyzeLottoResults({
      winningNumbers,
      lottoNumbers: this.lottoNumbers,
      investments: this.purchasePrice,
    });
  }

  isWinningNumberDuplicated(numbers) {
    const unDuplicatedNumbers = new Set();
    numbers.forEach((number) => {
      unDuplicatedNumbers.add(number);
    });

    return unDuplicatedNumbers.size !== LOTTO.NUMBER_COUNT_WITH_BONUS;
  }

  isWinningNumbersCorrectlyRegistered(winningLottoNumbers) {
    if (this.isWinningNumberDuplicated(winningLottoNumbers)) {
      return false;
    }

    return winningLottoNumbers.every((number) =>
      this.isWinningNumberCorrect(number)
    );
  }

  isWinningNumberCorrect(number) {
    return LOTTO.MIN_NUMBER <= number && number <= LOTTO.MAX_NUMBER;
  }

  getWinningNumbers(target) {
    return [...Array(7)].map(
      (_, index) => +target[`lotto-number-${index + 1}`].value
    );
  }

  calculateAmountPer(purchasePrice) {
    return purchasePrice / 1000;
  }

  isUnavailablePurchasePrice(purchasePrice) {
    return purchasePrice === 0 || purchasePrice % 1000 !== 0;
  }

  isExceedPurchasePriceLimit(purchasePrice) {
    return purchasePrice > LOTTO.LIMIT_PURCHASE_PRICE;
  }
}

export default LottoMachine;
