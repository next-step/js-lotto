export class LottoReward {
  #matched;

  #prize;

  #hasBonus;

  constructor(matched, prize) {
    this.#matched = matched;
    this.#prize = prize;
  }

  get prize() {
    return this.#prize;
  }

  get matched() {
    return this.#matched;
  }

  get hasBonus() {
    return this.#hasBonus;
  }

  static getReward(winningLotto, lotto) {
    const matched = winningLotto.getMatchedCount(lotto);
    const hasBonus = winningLotto.hasBonus(lotto);
    return new LottoReward(matched, LottoReward.getPrizeMoney(matched, hasBonus));
  }

  static getPrizeMoney(match, hasBonus = false) {
    switch (match) {
      case 6:
        return 2_000_000_000;
      case 5:
        return hasBonus ? 30_000_000 : 1_500_000;
      case 4:
        return 50_000;
      case 3:
        return 5_000;
      default:
        return 0;
    }
  }
}
