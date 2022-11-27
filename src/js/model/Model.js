import { LOTTO } from '../constants/index.js';
import { getLottoRank, getRateOfReturn } from '../service/lotto.js';
import { generateRandomNumbersToArray } from '../utils/index.js';
import { getLottoPurchasePrice } from '../view/lotto.js';

class Model {
  #lottoPurchaseCount = 0;

  #lottos = [];

  #lottoWinningCount = {
    3: 0,
    4: 0,
    5: 0,
    '5_BONUS': 0,
    6: 0,
  };

  #rateOfReturn = 0;

  #isFinished = false;

  get lottoPurchaseCount() {
    return this.#lottoPurchaseCount;
  }

  set lottoPurchaseCount(count) {
    this.#lottoPurchaseCount = count;
  }

  get lottos() {
    return this.#lottos;
  }

  get lottoWinningCount() {
    return this.#lottoWinningCount;
  }

  get rateOfReturn() {
    return this.#rateOfReturn;
  }

  get isFinished() {
    return this.#isFinished;
  }

  set isFinished(isFinished) {
    this.#isFinished = isFinished;
  }

  buyLottoSelf(numbers) {
    this.#lottos.push(numbers);
  }

  buyLottoAuto() {
    this.#lottos.push(generateRandomNumbersToArray(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, LOTTO.NUMBER_AMOUNT));
  }

  calculateLottoWinningResult(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      const rank = getLottoRank(lotto, winningNumbers, bonusNumber);

      if (rank < LOTTO.WINNING_MINIMUM_NUMBER) return;

      this.#lottoWinningCount[rank]++;
    });

    const lottoPurchasePrice = getLottoPurchasePrice();

    this.#rateOfReturn = getRateOfReturn(this.#lottoWinningCount, lottoPurchasePrice);
  }

  reset() {
    this.#lottoPurchaseCount = 0;
    this.#lottos = [];
    this.#lottoWinningCount = {
      3: 0,
      4: 0,
      5: 0,
      '5_BONUS': 0,
      6: 0,
    };
    this.#rateOfReturn = 0;
    this.#isFinished = false;
  }
}

const model = new Model();

export default model;
