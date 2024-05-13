import {
  LOTTO_3RD_PRIZE_WINNER,
  LOTTO_4TH_PRIZE_WINNER,
  LOTTO_5TH_PRIZE_WINNER,
  LOTTO_BONUS_COUNT,
  LOTTO_FIRST_PRIZE_WINNER,
  LOTTO_MAX_NUMBER,
  LOTTO_PRICE,
  LOTTO_SECOND_PRIZE_WINNER,
  LOTTO_TOTAL_COUNT,
  RADIX_INTEGER,
} from '../constants';
import { generateRandomNumbers } from '../utils';
import Lotto from './Lotto';
import LottoValidator from './LottoValidator';

class LottoMachine {
  #winnigNumbers;
  #bonusNumber;

  constructor() {
    this.#winnigNumbers = [];
    this.#bonusNumber = 0;
    this.validators = new LottoValidator();
  }

  get winnigNumbers() {
    return this.#winnigNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  set winnigNumbers(numbers) {
    this.#winnigNumbers = numbers;
  }

  set bonusNumber(number) {
    this.#bonusNumber = number;
  }

  createLottos(inputPrices) {
    this.validators.validCheckAmount(inputPrices);
    const numberLottoPurchases = Math.floor(inputPrices / LOTTO_PRICE);

    return [...Array(numberLottoPurchases)].map(
      () => new Lotto(this.generateLottoNumbers())
    );
  }

  generateLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length !== LOTTO_TOTAL_COUNT) {
      const number = generateRandomNumbers(LOTTO_MAX_NUMBER, RADIX_INTEGER);
      if (!lottoNumbers.includes(number)) {
        lottoNumbers.push(number);
      }
    }

    return lottoNumbers;
  }

  resultsLottoWinning(lotto) {
    const result = lotto.filter((number) => this.#winnigNumbers.includes(number)).length;

    if (result === LOTTO_BONUS_COUNT) {
      const bonus = lotto.filter((number) => number === this.#bonusNumber);
      if (bonus.length === 1) {
        return BONUS_WINNING;
      }
    }

    return result;
  }

  checkLottoWinning(lottos) {
    this.validators.validEnterWinningNumbers(this.#winnigNumbers);
    this.validators.validEnterBonusNumber(this.#bonusNumber);

    const result = lottos.map((lotto) => {
      lotto.result = this.resultsLottoWinning(lotto.numbers);
      return lotto;
    });

    return result;
  }

  switchResultToMoney(result) {
    switch (result) {
      case LOTTO_5TH_PRIZE_WINNER:
        return 5_000;
      case LOTTO_4TH_PRIZE_WINNER:
        return 50_000;
      case LOTTO_3RD_PRIZE_WINNER:
        return 1_500_000;
      case LOTTO_SECOND_PRIZE_WINNER:
        return 30_000_000;
      case LOTTO_FIRST_PRIZE_WINNER:
        return 2_000_000_000;

      default:
        return 0;
    }
  }

  returnsLottos(prices, lottos) {
    const totalProfit = lottos.reduce((acc, lotto) => {
      return acc + this.switchResultToMoney(lotto.result);
    }, 0);

    return (totalProfit / prices).toFixed(2) * 100;
  }
}

export default LottoMachine;
