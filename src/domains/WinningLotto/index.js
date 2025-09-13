export class WinningLotto {
  #lotto;
  #bonusLottoNumber;

  constructor(lotto, bonusLottoNumber) {
    this.#lotto = lotto;
    this.#bonusLottoNumber = bonusLottoNumber;
  }

  evaluateLotto(lotto) {
    return {
      matchingCount: this.#lotto.countMatchingLottoNumber(lotto),
      isBonusNumberMatched: lotto.hasLottoNumber(this.#bonusLottoNumber),
    };
  }
}
