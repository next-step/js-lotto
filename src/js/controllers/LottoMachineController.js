import LottoController from "./LottoController.js";
import LottoAnalyticsController from "./LottoAnalyticsController.js";
import LottoMachineView from "../views/LottoMachineView.js";
import { LOTTO, MESSAGES } from "../constants.js";
import LottoMachine from "../models/LottoMachine.js";

class LottoMachineController {
  #lottoMachine;
  #lottoMachineView;

  #lottoController;
  #lottoAnalyticsController;

  constructor() {
    this.#lottoController = new LottoController();
    this.#lottoAnalyticsController = new LottoAnalyticsController();

    this.#lottoMachine = new LottoMachine();
    this.#lottoMachineView = new LottoMachineView();

    this.#subscribeEvents();
  }

  #subscribeEvents() {
    this.#lottoMachineView.$purchaseForm.addEventListener(
      "submit",
      this.#onPurchase.bind(this)
    );
    this.#lottoMachineView.$lastWinningNumbersForm.addEventListener(
      "submit",
      this.#onCheckWinningLottoResult.bind(this)
    );
    document.addEventListener("@clear", () => {
      this.clear();
    });
  }

  #onPurchase(event) {
    event.preventDefault();

    const purchasePrice = this.#lottoMachineView.$purchaseAmountInput.value;
    if (this.isUnavailablePurchasePrice(+purchasePrice)) {
      window.alert(MESSAGES.WRONG_PURCHASE_PRICE);
      return;
    }

    if (this.isExceedPurchasePriceLimit(+purchasePrice)) {
      window.alert(MESSAGES.WRONG_PURCHASE_PRICE);
      return;
    }

    this.#lottoMachine.setPurchasePrice(purchasePrice);
    const purchaseAmount = this.calculateAmountPer(purchasePrice);

    this.#lottoController.onGenerateLottosBy(purchaseAmount);
    this.#lottoMachineView.showElement(
      this.#lottoMachineView.$lastWinningNumbersForm
    );
  }

  #onCheckWinningLottoResult(e) {
    e.preventDefault();

    const winningNumbers = this.getWinningNumbers(e.target);
    if (this.isWinningNumberDuplicated(winningNumbers)) {
      window.alert(MESSAGES.WRONG_LOTTO_NUMBER);
      return;
    }

    this.#lottoMachine.setWinningNumbers(winningNumbers);
    this.#lottoAnalyticsController.onAnalyzeLottoResults({
      winningNumbers: this.#lottoMachine.getWinningNumbers(),
      lottoNumbers: this.#lottoController.getLottoNumbers(),
      investments: this.#lottoMachine.getPurchasePrice(),
    });
  }

  clear() {
    this.#lottoMachine.clear();
    this.#lottoMachineView.clear();
  }

  isWinningNumberDuplicated(numbers) {
    const unDuplicatedNumbers = new Set();
    numbers.forEach((number) => {
      unDuplicatedNumbers.add(number);
    });

    return unDuplicatedNumbers.size !== LOTTO.NUMBER_COUNT_WITH_BONUS;
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

export default LottoMachineController;
