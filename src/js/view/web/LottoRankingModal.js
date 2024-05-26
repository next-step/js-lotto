import { $all, $ } from "../../../utils/dom.js";
import LottoRanking from "../../domain/LottoRanking.js";

const LottoRankingModal = {
  selector: {
    MODAL: $(".modal"),
    CLOSE_BUTTON: $(".modal-close"),
    WINNING_COUNT: $all(".winning-count"),
    PROFIT_RATE: $("#profit-rate"),
  },

  render(purchaseManager, lottoRanking) {
    this.renderTotalProfitRate(
      purchaseManager.purchasedAmount,
      purchaseManager.lottos,
      lottoRanking
    );
    this.renderLottoRanking(purchaseManager.lottos, lottoRanking);
  },

  renderTotalProfitRate(purchasedAmount, lottos, lottoRanking) {
    const totalWinningPrice = lottoRanking.getTotalLottoWinningPrice(lottos);
    const totalProfitRate = LottoRanking.getTotalLottoProfitRate(
      totalWinningPrice,
      purchasedAmount
    );

    const $profitRate = $("#profit-rate");
    $profitRate.textContent = totalProfitRate.toFixed(2);
  },

  renderLottoRanking(lottos, lottoRanking) {
    const winningCountElements = this.selector.WINNING_COUNT;
    const rankings = [
      LottoRanking.Ranking["FIFTH"],
      LottoRanking.Ranking["FOURTH"],
      LottoRanking.Ranking["THIRD"],
      LottoRanking.Ranking["SECOND"],
      LottoRanking.Ranking["FIRST"],
    ];

    rankings.forEach((ranking, index) => {
      const winningCountElement = winningCountElements[index];
      const winningCount = lottoRanking.getLottoRankingCount(lottos, ranking);
      winningCountElement.textContent = winningCount;
    });
  },

  open() {
    this.selector.MODAL.classList.add("open");
  },

  close() {
    this.selector.MODAL.classList.remove("open");
  },
};

export default LottoRankingModal;
