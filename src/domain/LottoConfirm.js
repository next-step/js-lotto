import {
  LOTTO_3RD_PRIZE_WINNER,
  LOTTO_4TH_PRIZE_WINNER,
  LOTTO_5TH_PRIZE_WINNER,
  LOTTO_BONUS_COUNT,
  LOTTO_FIRST_PRIZE_WINNER,
  LOTTO_SECOND_PRIZE_WINNER,
} from '../constants';
import LottoValidator from './LottoValidator';

class LottoConfirm {
  #winnigNumbers;
  #bonusNumber;

  constructor() {
    this.#winnigNumbers = [];
    this.#bonusNumber = 0;
    this.validators = new LottoValidator();
  }

  setWinningNumbers(number) {
    this.#winnigNumbers = number;
  }

  setBonusNumber(number) {
    this.#bonusNumber = number;
  }

  returnsLottos(prices, lottos) {
    const totalProfit = lottos.reduce((acc, lotto) => {
      return acc + LottoConfirm.switchResultToMoney(lotto.result);
    }, 0);

    return (totalProfit / prices).toFixed(2) * 100;
  }

  checkLottoWinning(lottos) {
    this.validators.validEnterWinningNumbers(this.#winnigNumbers);
    this.validators.validEnterBonusNumber(this.#bonusNumber);

    const result = lottos.map((lotto) => {
      lotto.result = LottoConfirm.resultsLottoWinning(
        lotto,
        this.#winnigNumbers,
        this.#bonusNumber
      );
      return lotto;
    });

    return result;
  }

  static resultsLottoWinning(lotto, winningNumber, bonusNumber) {
    const result = lotto.filter((number) => winningNumber.includes(number)).length;

    if (result === LOTTO_BONUS_COUNT) {
      const bonus = lotto.filter((number) => number === bonusNumber);
      if (bonus.length === 1) {
        return BONUS_WINNING;
      }
    }

    return result;
  }

  static switchResultToMoney(result) {
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
}

export default LottoConfirm;
