import { PRIZE_MONEY } from "../../constants.js";

export class LottoStatistics {
  constructor(rankCount, totalAmount) {
    this.rankCount = rankCount;
    this.totalAmount = totalAmount;
  }

  calculateTotalPrize() {
    return Object.keys(PRIZE_MONEY).reduce((total, rank) => {
      return total + (this.rankCount[rank] || 0) * PRIZE_MONEY[rank];
    }, 0);
  }

  calculateProfitRate() {
    const totalPrize = this.calculateTotalPrize();
    return (((totalPrize - this.totalAmount) / this.totalAmount) * 100).toFixed(
      1,
    );
  }
}
