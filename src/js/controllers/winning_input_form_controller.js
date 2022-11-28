import { ERROR_MESSAGE, LOTTO, PROFIT, ZERO_NUMBER } from '../../const.js';
import {
  getSameNumberCount,
  hasDuplicateNumbers,
  isNumbersOutOfRange,
} from '../../utils.js';
import Controller from './controller.js';

class WinningInputFormController extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  computeProfit() {
    const { result, price } = this.model;
    const total = Object.keys(result).reduce(
      (accumulator, key) =>
        accumulator + this.model.result[key] * PROFIT[key].PRICE,
      ZERO_NUMBER
    );

    return ((total - price) / price) * 100;
  }

  computeWinningNumbers() {
    const {
      lottos,
      winningNumbers: originWinningNumbers,
      setResult,
      setProfit,
    } = this.model;
    const winningNumbers = originWinningNumbers.slice(ZERO_NUMBER, LOTTO.COUNT);
    const bonusNumber = originWinningNumbers[LOTTO.COUNT];

    lottos.forEach((lotto) => {
      const sameNumberCount = getSameNumberCount(lotto, winningNumbers);
      const hasBonusNumber =
        sameNumberCount === LOTTO.BONUS_APPLICABLE_COUNT &&
        winningNumbers.includes(bonusNumber);

      if (hasBonusNumber) {
        setResult(6);
        return;
      }

      if (sameNumberCount === 6) {
        setResult(7);
        return;
      }

      setResult(sameNumberCount);
    });

    setProfit(this.computeProfit());
  }

  validateWinningNumbers() {
    const { winningNumbers } = this.model;
    if (
      isNumbersOutOfRange({
        max: LOTTO.MAX_NUMBER,
        min: LOTTO.MIN_NUMBER,
        targets: winningNumbers,
      })
    ) {
      window.alert(ERROR_MESSAGE.INVALID_RANGE_NUMBER);
      return false;
    }

    if (hasDuplicateNumbers(winningNumbers)) {
      window.alert(ERROR_MESSAGE.INVALID_DUPLICATED_NUMBER);
      return false;
    }

    return true;
  }

  handleClickShowResultButton() {
    if (this.validateWinningNumbers()) {
      this.computeWinningNumbers();
      this.view.$winningResultModal.classList.add('open');
    }
  }

  addChangeEvent({ target }) {
    if (this.view.$winningLottoNumbersForm.contains(target)) {
      const numberIndex = target.name;
      this.model.setWinningNumbers(Number(target.value), numberIndex);
    }
  }

  addSubmitEvent(event) {
    const { target } = event;
    if (this.view.$winningLottoNumbersForm.contains(target)) {
      event.preventDefault();
      this.handleClickShowResultButton();
    }
  }
}

export default WinningInputFormController;
