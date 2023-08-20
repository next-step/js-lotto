import { ERROR_MESSAGE } from '../constants/error-message';
import { LOTTO_AMOUNT_UNIT, LOTTO_NUMBERS_LENGTH } from '../constants/lotto';
import { getNullArray } from '../utils/array';
import { getRandomNumber } from '../utils/number';
import { Lotto } from './Lotto';

export class LottoMachine {
  #winningLottoResult;

  constructor() {
    this.#winningLottoResult = {
      FIRST: [],
      SECOND: [],
      THIRD: [],
      FOURTH: [],
      FIFTH: [],
    };
  }
  issueLotto(money) {
    const amount = parseInt(money, 10);

    this.#validateMoneyUnit(amount, LOTTO_AMOUNT_UNIT);

    const nullArray = getNullArray(this.#getNumberOfLotto(amount));

    return nullArray.map(() => new Lotto(this.#generateLottoNumbers()));
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

  #getNumberOfLotto(amount) {
    return amount / LOTTO_AMOUNT_UNIT;
  }

  #generateLottoNumbers() {
    const numbers = [];

    while (numbers.length < LOTTO_NUMBERS_LENGTH) {
      const randomNumber = getRandomNumber(1, 45);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  #validateMoneyUnit(amount, unit) {
    if (amount === 0 || amount % unit !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_LOTTO_AMOUNT_UNIT(unit));
    }
  }
}
