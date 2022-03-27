import {
  ACCEPT_BONUS_NUMBER,
  AMOUNT_UNIT,
  ERROR_MESSAGE,
  MAX_LOTTO_DIGIT,
  MAX_LOTTO_NUMBER,
  MIN_WINNING_COUNT,
} from './constants.js';
import { isEmpty } from '../helper/index.js';

class LottoService {
  #amount = 0;
  #lottos = [];
  #winningLottoTable = {
    3: 5000,
    4: 50000,
    5: 1500000,
    '5-1': 30000000,
    6: 2000000000,
  };

  setAmount(amount) {
    this.#amount = amount;
    return true;
  }

  getLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < MAX_LOTTO_DIGIT) {
      numbers.add(Math.trunc(Math.random() * MAX_LOTTO_NUMBER) + 1);
    }
    return Array.from(numbers);
  };

  purchasesLotto(number) {
    const result = Array.from({ length: number }).map(() => this.getLottoNumbers());
    this.#lottos = result;
    return result;
  }

  validCount = amount => {
    const count = Number(amount / AMOUNT_UNIT);
    if (isEmpty(amount) || isNaN(count)) throw new Error(ERROR_MESSAGE.REQUIRED_DIGIT);
    if (amount < AMOUNT_UNIT) throw new Error(ERROR_MESSAGE.MUST_MORE_THAN);
    if (!Number.isInteger(count)) throw new Error(ERROR_MESSAGE.MUST_REQUIRED_AMOUNT_UNIT);
    return this.setAmount(amount) && count;
  };

  validWinningNumber = value => {
    if (isEmpty(value)) throw new Error(ERROR_MESSAGE.REQUIRED_WINNING_NUMBER);
    if (value > MAX_LOTTO_NUMBER) throw new Error(ERROR_MESSAGE.MUST_LESS_THAN);
    if (value < 1) throw new Error(ERROR_MESSAGE.MUST_MORE_THAN_ONE);
    return true;
  };

  isLotteryOpen(target) {
    return target.matches('.open-result-modal-button');
  }

  isLotteryClose(target) {
    return target.matches('.modal-close');
  }

  notingAction = target => {
    return !this.isLotteryOpen(target) && !this.isLotteryClose(target);
  };

  checkLottery = winningNumbers => {
    const nonDuplicateWinningNumbers = new Set(winningNumbers);
    if (nonDuplicateWinningNumbers.has('')) throw new Error(ERROR_MESSAGE.REQUIRED_DIGIT);
    if (nonDuplicateWinningNumbers.size < MAX_LOTTO_DIGIT + 1)
      throw new Error(ERROR_MESSAGE.MUST_NOT_DUPLICATE);

    winningNumbers.every(this.validWinningNumber);
  };

  findCoincidenceCount = (lotto, regular) => {
    return lotto.filter(lottoNumber => regular.includes(`${lottoNumber}`)).length;
  };

  parseRegularCoincidenceCount = (regular, bonus) => {
    return regular === ACCEPT_BONUS_NUMBER ? `${regular}${bonus}` : regular;
  };

  lotteryResult(winningNumbers) {
    this.checkLottery(winningNumbers);

    const regular = winningNumbers.slice(0, -1);
    const bonus = winningNumbers.at(-1);

    return this.#lottos.map(lotto => {
      const regularCoincidenceCount = this.findCoincidenceCount(lotto, regular);
      const bonusCoincidence = lotto.includes(Number(bonus)) ? '-1' : '';
      return this.parseRegularCoincidenceCount(regularCoincidenceCount, bonusCoincidence);
    });
  }

  summary = (result, count) => {
    if (count < MIN_WINNING_COUNT) return result;
    return { ...result, [count]: result[count] === undefined ? 1 : result[count] + 1 };
  };

  profitCalculate(result, winningNumbersCount) {
    const [winningCount, count] = winningNumbersCount;
    return result + this.#winningLottoTable[winningCount] * count;
  }

  // TODO: refactoring to functional programming
  lotterySummary(winningNumbers) {
    return winningNumbers.reduce(this.summary, {});
  }

  profitRateCalculate(winningNumbers) {
    const profit = Object.entries(winningNumbers).reduce(this.profitCalculate.bind(this), 0);
    return ((profit - this.#amount) / this.#amount) * 100;
  }

  initLottos() {
    this.#amount = 0;
    this.#lottos = [];
  }
}

const sigletonInstance = new LottoService();

export default sigletonInstance;
