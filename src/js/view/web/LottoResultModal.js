import { $all, $ } from "../../../utils/dom.js";
import LottoResult from "../../domain/LottoResult.js";

class LottoResultModal {
  #$modal;

  constructor($modal, $closeButton) {
    this.#$modal = $modal;
    $closeButton.addEventListener("click", this.close.bind(this));
  }

  renderLottoResult(lottoGame, lottoResult) {
    this.renderTotalProfitRate(
      lottoGame.purchasedAmount,
      lottoGame.lottos,
      lottoResult
    );
    this.renderLottoRankings(lottoGame.lottos, lottoResult);
  }

  renderTotalProfitRate(purchasedAmount, lottos, lottoResult) {
    const totalWinningPrice = lottoResult.getTotalLottoWinningPrice(lottos);
    const totalProfitRate = LottoResult.getTotalLottoProfitRate(
      totalWinningPrice,
      purchasedAmount
    );

    const $profitRate = $("#profit-rate");
    $profitRate.textContent = totalProfitRate.toFixed(2);
  }

  renderLottoRankings(lottos, lottoResult) {
    const winningCountElements = $all(".winning-count");
    const lottoRankings = [
      LottoResult.LottoRanking["FIFTH"],
      LottoResult.LottoRanking["FOURTH"],
      LottoResult.LottoRanking["THIRD"],
      LottoResult.LottoRanking["SECOND"],
      LottoResult.LottoRanking["FIRST"],
    ];

    lottoRankings.forEach((lottoRanking, index) => {
      const winningCountElement = winningCountElements[index];
      const winningCount = lottoResult.getLottoRankingCount(
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
