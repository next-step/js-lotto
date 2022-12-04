import LottoAnalytics from "../models/LottoAnalytics.js";
import LottoAnalyticsView from "../views/LottoAnalyticsView.js";
import Modal from "../modals/index.js";
import modalTemplates from "../modals/modalTemplates.js";
import { LOTTO, MESSAGES } from "../constants.js";

class LottoAnalyticsController {
  constructor(lottoNumbers) {
    this.LottoAnalytics = new LottoAnalytics();
    this.LottoAnalyticsView = new LottoAnalyticsView();

    this.lottoNumbers = lottoNumbers;

    this.#subscribeEvents();
  }

  #subscribeEvents() {
    this.LottoAnalyticsView.$lastWinningNumbersForm.addEventListener(
      "submit",
      this.onCheckLottoResult.bind(this)
    );
  }

  onInputWinningNumbers() {
    this.LottoAnalyticsView.onShowElement(
      this.LottoAnalyticsView.$lastWinningNumbersForm
    );
  }

  onCheckLottoResult(e) {
    e.preventDefault();

    const winningNumbers = this.getWinningNumbers(e.target);
    if (!this.isWinningNumbersCorrectlyRegistered(winningNumbers)) {
      window.alert(MESSAGES.WRONG_LOTTO_NUMBER);
      return;
    }
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

  onShow() {
    Modal.getInstance()
      .setTemplate(modalTemplates.winningGameAnalytics())
      .show();
  }

  /**
   * 각 로또 번호에 대한 계산
   * 1. 등수 뱉어주는.
   * 2. 이걸 가지고 통계 array 구성하면 되지 않나?
   */
}

export default LottoAnalyticsController;
