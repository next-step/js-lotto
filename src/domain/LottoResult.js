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

  getWinningAmount(rank) {
    switch (rank) {
      case 1:
        return 2000000000;
      case 2:
        return 30000000;
      case 3:
        return 1500000;
      case 4:
        return 50000;
      case 5:
        return 5000;
      default:
        return 0;
    }
  }

  getWinningResult(lottoList) {
    const result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

    lottoList.forEach((lotto) => {
      result[this.getRanking(lotto)] += 1;
    });

    return result;
  }

  getTotalProfit(lottoList) {
    return lottoList.reduce(
      (acc, lotto) => acc + this.getWinningAmount(this.getRanking(lotto)),
      0
    );
  }

  getProfitRate(amount, lottoList) {
    const totalProfit = this.getTotalProfit(lottoList);
    const profit = totalProfit - amount;
    return (profit / amount) * 100;
  }
}
