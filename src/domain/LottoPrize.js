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
      return 'FIRST';
    }
    if (matchedCount === 5 && bonusMatched) {
      return 'SECOND';
    }
    if (matchedCount === 5) {
      return 'THIRD';
    }
    if (matchedCount === 4) {
      return 'FOURTH';
    }
    if (matchedCount === 3) {
      return 'FIFTH';
    }
    return 'LOSS';
  }
}
