/* eslint-disable class-methods-use-this */
import {
  LOTTO_BONUS_NUMBER_SCORE,
  LOTTO_NUMBER_LENGTH,
  LOTTO_RANKS,
  LOTTO_UNIT_PRICE,
  LOTTO_WINNING_NUMBER_SCORE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../constants/index.js';

class Lotto {
  #lottos;

  #scores;

  constructor() {
    this.init();
  }

  get length() {
    return this.#lottos.length;
  }

  init() {
    this.#lottos = [];
    this.#scores = {};
  }

  #getLottoNumber() {
    return Math.floor(Math.random() * MAX_LOTTO_NUMBER) + MIN_LOTTO_NUMBER;
  }

  #createLotto() {
    const numbers = new Set();

    do {
      numbers.add(this.#getLottoNumber());
    } while (numbers.size < LOTTO_NUMBER_LENGTH);

    return Array.from(numbers).sort((a, b) => a - b);
  }

  getNumbers() {
    return this.#lottos;
  }

  createLottos(count) {
    this.#lottos = Array.from(new Array(count), () => this.#createLotto());
  }

  setWinningLotto(winningNumbers, bonusNumber) {
    this.#scores[bonusNumber] = LOTTO_BONUS_NUMBER_SCORE;

    winningNumbers.forEach((number) => {
      this.#scores[number] = LOTTO_WINNING_NUMBER_SCORE;
    });
  }

  #calculateScore(lotto) {
    return lotto.reduce((sum, number) => sum + (this.#scores[number] || 0), 0);
  }

  getCountOfRanks() {
    return this.#lottos
      .map((lotto) => this.#calculateScore(lotto))
      .reduce((ranks, score) => {
        const { rank } = LOTTO_RANKS[score] || {};

        if (rank) {
          ranks[rank] = (ranks[rank] || 0) + 1;
        }

        return ranks;
      }, {});
  }

  getEarningsRate() {
    const earnings = this.#lottos
      .map((lotto) => this.#calculateScore(lotto))
      .reduce(
        (sum, score) => sum + (LOTTO_RANKS[score] ? LOTTO_RANKS[score].won : 0),
        0
      );
    const pay = this.#lottos.length * LOTTO_UNIT_PRICE;

    return ((earnings - pay) / pay) * 100;
  }
}

export default Lotto;
