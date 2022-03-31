import {
  ACCEPT_BONUS_NUMBER,
  AMOUNT_UNIT,
  BONUS_LOTTO_DIGIT,
  ERROR_MESSAGE,
  MAX_LOTTO_DIGIT,
  MAX_LOTTO_NUMBER,
  MIN_WINNING_COUNT,
} from './constants.js';
import { isEmpty, $elements } from '../helper/index.js';

class LottoService {
  amount = 0;
  count = 0;
  #lottos = [];
  #winningLottoTable = {
    3: 5000,
    4: 50000,
    5: 1500000,
    '5-1': 30000000,
    6: 2000000000,
  };

  createManualPurchaseFormContent = count => {
    return $elements(
      /*html*/
      `<div><div class="scroll-area p-5">
        ${Array.from({ length: count })
          .map(
            (item, index) => /*html*/ `
        <div class="d-flex mb-3" data-props="lotto-purchase-numbers" key="${index}">
          <div>
            <h4 class="mt-0 mb-3 text-center">${index + 1}장🎫</h4>
          </div>
          <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div class="py-1">
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
            </div>
          </div>
          <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="d-flex py-1 justify-center">
              <input type="number" class="purchase-number bonus-number text-center" />
            </div>
          </div>
        </div>`,
          )
          .join('')}
      </div>
      <button
        type="button"
        class="manual-purchase-confirm-button mt-5 btn btn-cyan w-100"
      >
        확인
      </button></div>`,
    );
  };

  getLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < MAX_LOTTO_DIGIT) {
      numbers.add(Math.trunc(Math.random() * MAX_LOTTO_NUMBER) + 1);
    }
    return Array.from(numbers);
  };

  generatedLotto(alreadyBoughtLotto) {
    const length = this.count - alreadyBoughtLotto.length;
    const result = [
      ...alreadyBoughtLotto,
      ...Array.from({ length }).map(() => this.getLottoNumbers()),
    ];
    this.#lottos = result;
    return result;
  }

  validAmount(amount) {
    const count = Number(amount / AMOUNT_UNIT);
    if (isEmpty(amount) || isNaN(count)) throw new Error(ERROR_MESSAGE.REQUIRED_DIGIT);
    if (amount < AMOUNT_UNIT) throw new Error(ERROR_MESSAGE.MUST_MORE_THAN);
    if (!Number.isInteger(count)) throw new Error(ERROR_MESSAGE.MUST_REQUIRED_AMOUNT_UNIT);

    this.amount = amount;
    this.count = count;
    return count;
  }

  isValidCount(count) {
    if (isEmpty(count) || isNaN(count)) throw new Error(ERROR_MESSAGE.REQUIRED_DIGIT);
    if (0 > count || count > this.count) throw new Error(ERROR_MESSAGE.IMPOSSIBLE_COUNT);
    if (!Number.isInteger(Number(count))) throw new Error(ERROR_MESSAGE.MUST_REQUIRED_AMOUNT_UNIT);

    return true;
  }

  isValidPurchasesNumbers = value => {
    if (isEmpty(value)) throw new Error(ERROR_MESSAGE.REQUIRED_WINNING_NUMBER);
    if (value > MAX_LOTTO_NUMBER) throw new Error(ERROR_MESSAGE.MUST_LESS_THAN);
    if (value < 1) throw new Error(ERROR_MESSAGE.MUST_MORE_THAN_ONE);
    return true;
  };

  isLotteryOpen = target => {
    return target.matches('.open-result-modal-button');
  };

  isLotteryClose = target => {
    return target.matches('.modal-close');
  };

  notingAction(target) {
    return !this.isLotteryOpen(target) && !this.isLotteryClose(target);
  }

  checkLottery(purchasedNumbers) {
    const uniquePurchasesNumbers = new Set(purchasedNumbers);
    if (uniquePurchasesNumbers.has('')) throw new Error(ERROR_MESSAGE.REQUIRED_DIGIT);
    if (uniquePurchasesNumbers.size < MAX_LOTTO_DIGIT + BONUS_LOTTO_DIGIT)
      throw new Error(ERROR_MESSAGE.MUST_NOT_DUPLICATE);
    const isValid = purchasedNumbers.every(this.isValidPurchasesNumbers);
    return isValid && purchasedNumbers;
  }

  findCoincidenceCount = (lotto, regular) => {
    return lotto.filter(lottoNumber => regular.includes(`${lottoNumber}`)).length;
  };

  parseRegularCoincidenceCount = (regular, bonus) => {
    return regular === ACCEPT_BONUS_NUMBER ? `${regular}${bonus}` : regular;
  };

  lotteryResult(winningNumbers) {
    const checkedNumbers = this.checkLottery(winningNumbers);
    const regular = checkedNumbers.slice(0, -1);
    const bonus = checkedNumbers.at(-1);

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

  profitCalculate(result, winningCounts) {
    const [winningCount, count] = winningCounts;
    return result + this.#winningLottoTable[winningCount] * count;
  }

  // TODO: refactoring to functional programming
  lotterySummary(lottery) {
    return lottery.reduce(this.summary, {});
  }

  profitRateCalculate(result) {
    const profit = Object.entries(result).reduce(this.profitCalculate.bind(this), 0);
    return Math.trunc(((profit - this.amount) / this.amount) * 100);
  }

  initLottos() {
    this.amount = 0;
    this.count = 0;
    this.#lottos = [];
  }
}

const sigletonInstance = new LottoService();

export default sigletonInstance;
