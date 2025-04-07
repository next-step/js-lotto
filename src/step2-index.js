/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import { initializeLottoPurchase, renderLottoList, renderLottoResult } from "./views/web/lottoView.js";
import LottoController from "./controller/LottoController.js";

class LottoApp {
  constructor() {
    this.lottoController = new LottoController();
    initializeLottoPurchase(this.buyLotto);
    document
      .getElementById("checkResultsButton")
      .addEventListener("click", this.checkResults);
    document
      .getElementById("restartButton")
      .addEventListener("click", () => window.location.reload());
  }

  buyLotto = (amount) => {
    try {
      this.lottoController.buyLottos(amount);
      renderLottoList(this.lottoController.getLottos());
    } catch (error) {
      alert(error.message);
    }
  };

  checkResults = () => {
    try {
      const winningNumbers = [
        ...document.querySelectorAll(".winning-number"),
      ].map((input) => input.value);
      const bonusNumber = document.querySelector(".bonus-number").value;

      const statistics = this.lottoController.calculateResults(
        winningNumbers,
        bonusNumber,
      );
      const profit = this.lottoController.getProfit();
      renderLottoResult(statistics, profit);
    } catch (error) {
      alert(error.message);
    }
  };
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", () => new LottoApp())
  : new LottoApp();
