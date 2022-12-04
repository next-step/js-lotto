import LottoAnalytics from "../models/LottoAnalytics.js";
import LottoAnalyticsView from "../views/LottoAnalyticsView.js";
import Modal from "../modals/index.js";
import { LOTTO, MESSAGES } from "../constants.js";

class LottoAnalyticsController {
  constructor(lottoNumbers) {
    this.lottoAnalytics = new LottoAnalytics(lottoNumbers);
    this.lottoAnalyticsView = new LottoAnalyticsView();

    this.#subscribeEvents();
  }

  #subscribeEvents() {
    this.lottoAnalyticsView.$lastWinningNumbersForm.addEventListener(
      "submit",
      this.onCheckLottoResult.bind(this)
    );
  }

  onInputWinningNumbers() {
    this.lottoAnalyticsView.onShowElement(
      this.lottoAnalyticsView.$lastWinningNumbersForm
    );
  }

  onCheckLottoResult(e) {
    e.preventDefault();

    const winningNumbers = this.getWinningNumbers(e.target);
    if (!this.isWinningNumbersCorrectlyRegistered(winningNumbers)) {
      window.alert(MESSAGES.WRONG_LOTTO_NUMBER);
      return;
    }

    this.lottoAnalytics.setWinningNumbers(winningNumbers);

    const analytics = this.lottoAnalytics.getAnalytics();
    const winningRates = this.lottoAnalytics.getWinningRates();
    this.onAnalyticsModalShow(analytics, winningRates);
  }

  getWinningNumbers(target) {
    return [...Array(7)].map(
      (_, index) => +target[`lotto-number-${index + 1}`].value
    );
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

  isWinningNumberDuplicated(numbers) {
    const unDuplicatedNumbers = new Set();
    numbers.forEach((number) => {
      unDuplicatedNumbers.add(number);
    });

    return unDuplicatedNumbers.size !== LOTTO.NUMBER_COUNT_WITH_BONUS;
  }

  onAnalyticsModalShow(analytics, winningRates) {
    Modal.getInstance()
      .setTemplate(
        this.lottoAnalyticsView.templateAnalyticsModal(analytics, winningRates)
      )
      .show();
  }
}

export default LottoAnalyticsController;
