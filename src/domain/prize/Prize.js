class Prize {
  constructor(prizeAmount, matchingStrategy) {
    this.prizeAmount = prizeAmount;
    this.matchingStrategy = matchingStrategy;
  }

  matched(lotto, winningLotto) {
    return this.matchingStrategy(lotto, winningLotto);
  }
}

export default Prize;
