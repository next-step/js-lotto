import { Lotto } from "../models/Lotto.js";
import { LottoResult } from "../models/LottoResult.js";

class LottoService {
  constructor(totalAmount, winningNumbers, bonusNumber) {
    this.lotto = new Lotto(totalAmount);
    this.lottoResult = new LottoResult(winningNumbers, bonusNumber);
  }

  checkResults() {
    const tickets = this.lotto.generateLottoTickets();
    return tickets.map((ticket) => this.lottoResult.calculateRank(ticket));
  }
}
