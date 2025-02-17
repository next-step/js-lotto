class Prize {
  constructor(lottoNumberMatchCount, prizeAmount) {
    this.lottoNumberMatchCount = lottoNumberMatchCount;
    this.prizeAmount = prizeAmount;
  }

  matched(lotto, winningLotto) {
    return winningLotto.countMatchNumbers(lotto) === this.lottoNumberMatchCount;
  }
}

export default Prize;
