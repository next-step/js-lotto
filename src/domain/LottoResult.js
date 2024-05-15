export class LottoResult {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  getRanking(lotto) {
    const count = lotto.getMatchCount(this.#winningNumbers);
    const isMatchingBonus = lotto.numbers.includes(this.#bonusNumber);

    switch (count) {
      case 6:
        return 1;
      case 5:
        if (isMatchingBonus) return 2;
        return 3;
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return 6;
    }
  }
}
