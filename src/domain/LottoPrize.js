import {PRIZE} from './constants';

export class LottoPrize {
  #winningNumbers;
  #bonusNumber;

  constructor({winningNumbers, bonusNumber}) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  #getMatchedCount(lottery) {
    return lottery.filter(number => this.#winningNumbers.includes(number)).length;
  }
  #isBonusMatched(lottery) {
    return lottery.includes(this.#bonusNumber);
  }

  getLottoPrize(lottery) {
    const matchedCount = this.#getMatchedCount(lottery);
    const bonusMatched = this.#isBonusMatched(lottery);

    if (matchedCount === 6) {
      return PRIZE.FIRST;
    }
    if (matchedCount === 5 && bonusMatched) {
      return PRIZE.SECOND;
    }
    if (matchedCount === 5) {
      return PRIZE.THIRD;
    }
    if (matchedCount === 4) {
      return PRIZE.FOURTH;
    }
    if (matchedCount === 3) {
      return PRIZE.FIFTH;
    }
    return PRIZE.LOSS;
  }
}
