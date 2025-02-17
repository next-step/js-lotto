export class LottoStatistics {
  constructor(rankCount, totalAmount) {
    this.rankCount = rankCount;
    this.totalAmount = totalAmount;
    this.prizeMoney = {
      1: 2000000000,
      2: 30000000,
      3: 1500000,
      4: 50000,
      5: 5000,
    };
  }

  calculateTotalPrize() {
    return Object.keys(this.prizeMoney).reduce((total, rank) => {
      return total + (this.rankCount[rank] || 0) * this.prizeMoney[rank];
    }, 0);
  }

  calculateProfitRate() {
    const totalPrize = this.calculateTotalPrize();
    return ((totalPrize - this.totalAmount / this.totalAmount) * 100).toFixed(
      1,
    );
  }
}
