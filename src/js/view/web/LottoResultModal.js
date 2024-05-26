import { $all, $ } from "../../../utils/dom.js";
import LottoRanking from "../../domain/LottoRanking.js";

class LottoResultModal {
  #$modal;

  constructor() {
    this.#$modal = $(".modal");
    const closeButton = $(".modal-close");
    closeButton.addEventListener("click", this.close.bind(this));
  }

  renderLottoResult(lottoGame, lottoRanking) {
    this.renderTotalProfitRate(
      lottoGame.purchasedAmount,
      lottoGame.lottos,
      lottoRanking
    );
    this.renderLottoRankings(lottoGame.lottos, lottoRanking);
  }

  renderTotalProfitRate(purchasedAmount, lottos, lottoRanking) {
    const totalWinningPrice = lottoRanking.getTotalLottoWinningPrice(lottos);
    const totalProfitRate = LottoRanking.getTotalLottoProfitRate(
      totalWinningPrice,
      purchasedAmount
    );

    const $profitRate = $("#profit-rate");
    $profitRate.textContent = totalProfitRate.toFixed(2);
  }

  renderLottoRankings(lottos, lottoRanking) {
    const winningCountElements = $all(".winning-count");
    const lottoRankings = [
      LottoRanking.LottoRanking["FIFTH"],
      LottoRanking.LottoRanking["FOURTH"],
      LottoRanking.LottoRanking["THIRD"],
      LottoRanking.LottoRanking["SECOND"],
      LottoRanking.LottoRanking["FIRST"],
    ];

    lottoRankings.forEach((lottoRanking, index) => {
      const winningCountElement = winningCountElements[index];
      const winningCount = lottoRanking.getLottoRankingCount(
        lottos,
        lottoRanking
      );
      winningCountElement.textContent = winningCount;
    });
  }

  open() {
    this.#$modal.classList.add("open");
  }

  close() {
    this.#$modal.classList.remove("open");
  }
}

export default LottoResultModal;
