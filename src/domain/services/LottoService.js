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
    return [...this.tickets];
  }

  setWinningNumbers(winningNumbers, bonusNumber) {
    if (this.lottoResult) {
      throw new Error("당첨 번호는 한 번만 설정할 수 있습니다.");
    }
    this.lottoResult = new LottoResult(winningNumbers, bonusNumber);
  }

  getWinningRanks() {
    return this.lottoResult.getWinningRanks(this.tickets);
  }

  getLottoStatistics() {
    const rankCount = this.lottoResult.getWinningRanks(this.tickets);
    const totalAmount = this.lotto.totalAmount;
    const statistics = new LottoStatistics(rankCount, totalAmount);

    return statistics.calculateProfitRate();
  }
}
