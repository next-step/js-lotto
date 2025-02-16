import { Lotto } from "../models/Lotto.js";
import { LottoResult } from "../models/LottoResult.js";
import { LottoStatistics } from "../models/LottoStatistics.js";

export class LottoService {
  constructor(totalAmount) {
    this.lotto = new Lotto(totalAmount);
    this.tickets = this.lotto.generateLottoTickets();
    this.lottoResult = null;
  }

  getLottoTickets() {
    return this.tickets;
  }

  setWinningNumbers(winningNumbers, bonusNumber) {
    this.lottoResult = new LottoResult(winningNumbers, bonusNumber);
  }

  checkResults() {
    if (!this.lottoResult) {
      throw new Error("당첨 번호를 먼저 입력해주세요.");
    }

    return this.tickets.map((ticket) => this.lottoResult.calculateRank(ticket));
  }

  countWinningRanks() {
    const results = this.checkResults();
    const rankCount = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    results.forEach(({ rank }) => {
      if (rank > 0) {
        rankCount[rank] += 1;
      }
    });

    return rankCount;
  }

  getLottoStatistics() {
    const rankCount = this.countWinningRanks();
    const totalAmount = this.lotto.totalAmount;
    const statistics = new LottoStatistics(rankCount, totalAmount);

    return statistics.calculateProfitRate();
  }
}
