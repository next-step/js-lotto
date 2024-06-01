import { $all, $ } from "../../../utils/dom.js";
import LottoRanking from "../../domain/LottoRanking.js";

const LottoRankingModal = {
  elements: {
    MODAL: $(".modal"),
    CLOSE_BUTTON: $(".modal-close"),
    WINNING_COUNT: $all(".winning-count"),
    PROFIT_RATE: $("#profit-rate"),
  },

  render(purchasedAmount, lottos, lottoRanking) {
    this.renderTotalProfitRate(purchasedAmount, lottos, lottoRanking);
    this.renderLottoRanking(lottos, lottoRanking);
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
    const winningCountElements = this.elements.WINNING_COUNT;
    const rankings = [
      LottoRanking.Ranking["FIFTH"],
      LottoRanking.Ranking["FOURTH"],
      LottoRanking.Ranking["THIRD"],
      LottoRanking.Ranking["SECOND"],
      LottoRanking.Ranking["FIRST"],
    ];

    rankings.forEach((ranking, index) => {
      const winningCountElement = winningCountElements[index];
      const winningCount = lottoRanking.getLottoPrizeCount(lottos, ranking);
      winningCountElement.textContent = winningCount;
    });
  },

  open() {
    this.elements.MODAL.classList.add("open");
  },

  close() {
    this.elements.MODAL.classList.remove("open");
  },
};

export default LottoRankingModal;
