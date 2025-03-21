/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import LottoPurchase from "./components/LottoPurchase.js";

import LottoController from "./controller/LottoController.js";
import LottoList from "./components/LottoList.js";
import LottoResult from "./components/LottoResult.js";

class LottoApp {
  constructor() {
    this.lottoController = new LottoController();
    new LottoPurchase(this.buyLotto);
    document.getElementById("checkResultsButton").addEventListener("click", this.checkResults);
    document.getElementById("restartButton").addEventListener("click", () => window.location.reload());
  }

  buyLotto = (amount) => {
    try {
      this.lottoController.buyLottos(amount);
      new LottoList().render(this.lottoController.getLottos());
    } catch (error) {
      alert(error.message);
    }
  };

  checkResults = () => {
    try {
      const winningNumbers = [...document.querySelectorAll(".winning-number")].map((input) => input.value);
      const bonusNumber = document.querySelector(".bonus-number").value;

      const statistics = this.lottoController.calculateResults(
        winningNumbers,
        bonusNumber,
      );
      const profit = this.lottoController.getProfit();
      new LottoResult().render(statistics, profit);
    } catch (error) {
      alert(error.message);
    }
  };
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", () => new LottoApp())
  : new LottoApp();
