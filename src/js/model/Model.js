import { LOTTO } from '../constants/index.js';
import { getLottoRank, getRateOfReturn } from '../service/lotto.js';
import { generateRandomNumbersToArray } from '../utils/index.js';

class Model {
  #lottoPurchasePrice = 0;

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

  get lottoPurchasePrice() {
    return this.#lottoPurchasePrice;
  }

  set lottoPurchasePrice(Price) {
    this.#lottoPurchasePrice = Price;
  }

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

  buyLottoSelf(numbers) {
    this.#lottos.push(numbers);
  }

  buyLottoAuto() {
    this.#lottos.push(generateRandomNumbersToArray(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, LOTTO.NUMBER_AMOUNT));
  }

  calculateLottoWinningResult(winningNumbers, bonusNumber) {
    this.#lottoWinningCount = {
      3: 0,
      4: 0,
      5: 0,
      '5_BONUS': 0,
      6: 0,
    };

    this.#lottos.forEach((lotto) => {
      const rank = getLottoRank(lotto, winningNumbers, bonusNumber);

      if (rank < LOTTO.WINNING_MINIMUM_NUMBER) return;

      this.#lottoWinningCount[rank]++;
    });

    this.#rateOfReturn = getRateOfReturn(this.#lottoWinningCount, this.#lottoPurchasePrice);
  }

  reset() {
    this.#lottoPurchasePrice = 0;
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
  }
}

const model = new Model();

export default model;
