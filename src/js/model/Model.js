import { LOTTO } from '../constants/index.js';
import { generateLottoNumbersToArray, getLottoRank, getRateOfReturn } from '../service/lotto.js';

class Model {
  #lottoPurchasePrice;

  #lottoPurchaseCount;

  #lottos;

  #lottoWinningCount;

  #rateOfReturn;

  constructor() {
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

  get lottoPurchasePrice() {
    return this.#lottoPurchasePrice;
  }

  set lottoPurchasePrice(price) {
    this.#lottoPurchasePrice = price;
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

  set lottoWinningCount(price) {
    this.#lottoWinningCount = price;
  }

  get rateOfReturn() {
    return this.#rateOfReturn;
  }

  buyLotto(price) {
    this.#lottoPurchasePrice = price;
    this.#lottoPurchaseCount = this.#lottoPurchasePrice / LOTTO.PRICE;
    this.#lottos = generateLottoNumbersToArray(this.#lottoPurchaseCount);
  }

  calculateLottoWinningResult(winningNumbers, bonusNumber) {
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
