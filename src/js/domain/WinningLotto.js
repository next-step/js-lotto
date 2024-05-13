class WinningLotto {
  #winningLottoNumbers;
  #bonusNumber;

  constructor(winningLottoNumbers, bonusNumber) {
    this.#winningLottoNumbers = winningLottoNumbers;
    this.#bonusNumber = bonusNumber;
  }

  calculateMatchLottoCount(lottoNumbers) {
    return lottoNumbers.filter((number) =>
      this.#winningLottoNumbers.includes(number)
    ).length;
  }

  isMatchBonus(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }
}

export { WinningLotto };
