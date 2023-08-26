import { ERROR_MESSAGE } from '../constants/error-message.js';
import {
  LOTTO_AMOUNT_UNIT,
  LOTTO_FIFTH_PRIZE,
  LOTTO_FIRST_PRIZE,
  LOTTO_FOURTH_PRIZE,
  LOTTO_SECOND_PRIZE,
  LOTTO_THIRD_PRIZE,
} from '../constants/lotto.js';
import { Lotto } from './Lotto.js';

export class LottoMachine {
  #winningLottoResult;
  #lottoNumberGenrator;

  constructor(lottoNumberGenerator) {
    this.#lottoNumberGenrator = lottoNumberGenerator;
    this.#winningLottoResult = {
      FIRST: [],
      SECOND: [],
      THIRD: [],
      FOURTH: [],
      FIFTH: [],
      TOTAL_WINNING_PRIZE: 0,
    };
  }
  issueLotto(money) {
    const amount = parseInt(money, 10);

    this.#validateMoneyUnit(amount, LOTTO_AMOUNT_UNIT);

    return Array.from(
      { length: this.#getNumberOfLotto(amount) },
      () => new Lotto(this.#lottoNumberGenrator.generateNumber())
    );
  }

  getNumberOfMatchNumber(lotto, winningLotto) {
    const matchNumbers = lotto.numbers.filter((number) =>
      winningLotto.numbers.includes(number)
    );
    return matchNumbers.length;
  }

  checkWinningLotto(lottos, winningLotto) {
    lottos.forEach((lotto) => {
      const matchCount = this.getNumberOfMatchNumber(lotto, winningLotto);
      this.#setWinningLottoResult(matchCount, lotto, winningLotto);
    });
    this.#setWinningPrize();
    return this.#winningLottoResult;
  }

  #setWinningLottoResult(matchCount, lotto, winningLotto) {
    if (matchCount === 6) {
      this.#winningLottoResult.FIRST.push(lotto);
      return;
    }
    if (matchCount === 5 && lotto.numbers.includes(winningLotto.bonusNumber)) {
      this.#winningLottoResult.SECOND.push(lotto);
      return;
    }
    if (matchCount === 5) {
      this.#winningLottoResult.THIRD.push(lotto);
      return;
    }
    if (matchCount === 4) {
      this.#winningLottoResult.FOURTH.push(lotto);
      return;
    }
    if (matchCount === 3) {
      this.#winningLottoResult.FIFTH.push(lotto);
      return;
    }
  }

  #setWinningPrize() {
    const { FIRST, SECOND, THIRD, FOURTH, FIFTH } = this.#winningLottoResult;

    const firstPrize = FIRST.length * LOTTO_FIRST_PRIZE;
    const secondPrize = SECOND.length * LOTTO_SECOND_PRIZE;
    const thirdPrize = THIRD.length * LOTTO_THIRD_PRIZE;
    const fourthPrize = FOURTH.length * LOTTO_FOURTH_PRIZE;
    const fifthPrize = FIFTH.length * LOTTO_FIFTH_PRIZE;

    this.#winningLottoResult.TOTAL_WINNING_PRIZE =
      firstPrize + secondPrize + thirdPrize + fourthPrize + fifthPrize;
  }

  #getNumberOfLotto(amount) {
    return amount / LOTTO_AMOUNT_UNIT;
  }

  #validateMoneyUnit(amount, unit) {
    if (amount === 0 || amount % unit !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_LOTTO_AMOUNT_UNIT(unit));
    }
  }
}
