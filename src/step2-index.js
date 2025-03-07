/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import LottoController from "./controller/LottoController.js";
import Budget from "./domain/Budget.js";
import LottoNumber from "./domain/LottoNumber.js";
import WinningLotto from "./domain/WinningLotto.js";

document.addEventListener("DOMContentLoaded", function() {
  const buyButton = document.getElementById("buyButton");
  const amountInput = document.getElementById("amountInput");
  const lottoTicketsDiv = document.getElementById("lottoTickets");
  const checkResultsButton = document.getElementById("checkResultsButton");
  const modal = document.getElementById("resultModal");
  const closeButton = document.querySelector(".close-button");
  const restartButton = document.getElementById("restartButton");

  const controller = new LottoController();
  let lottoGame;

  buyButton.addEventListener("click", async () => {
    try {
      const budget = new Budget(amountInput.value);
      lottoGame = controller.lottoService.createLottoGame(budget);
      controller.lottoService.buyLottos(lottoGame);

      lottoTicketsDiv.innerHTML = "";
      const countMessage = document.createElement("p");
      countMessage.textContent = `총 ${lottoGame.getLottoCount()}개를 구매하였습니다.`;
      countMessage.classList.add("lotto-count");
      lottoTicketsDiv.appendChild(countMessage);

      lottoGame.getLottos().forEach((lotto) => {
        const ticketElement = document.createElement("div");
        ticketElement.classList.add("lotto-ticket");

        const lottoIcon = document.createElement("span");
        lottoIcon.textContent = "🎟";

        const lottoNumbers = document.createElement("span");
        lottoNumbers.textContent = lotto
          .getLottoNumbers()
          .map((lottoNumber) => lottoNumber.getValue())
          .join(", ");

        ticketElement.appendChild(lottoIcon);
        ticketElement.appendChild(lottoNumbers);
        lottoTicketsDiv.appendChild(ticketElement);
      });
    } catch (error) {
      alert(error.message);
    }
  });

  checkResultsButton.addEventListener("click", async () => {
    try {
      const winningNumbers = [...document.querySelectorAll(".winning-number")]
        .map((input) => input.value)
        .join(",");
      const bonusNumber = document.querySelector(".bonus-number").value;
      const lottoWinningNumbers =
        LottoNumber.createLottoNumbers(winningNumbers);
      const winningLotto = new WinningLotto(
        lottoWinningNumbers,
        LottoNumber.valueOf(bonusNumber),
      );
      const statistics = controller.lottoService.calculateResults(
        lottoGame,
        winningLotto,
      );

      const prizeMapping = new Map([
        [5000, "match-3"],
        [50000, "match-4"],
        [1500000, "match-5"],
        [30000000, "match-5b"],
        [2000000000, "match-6"],
      ]);

      for (const [prize, count] of statistics.entries()) {
        const elementId = prizeMapping.get(prize.prizeAmount);
        document.getElementById(elementId).textContent = `${count}개`;
      }

      document.getElementById("profit-rate").textContent =
        `당신의 총 수익률은 ${lottoGame.getProfit()}%입니다.`;

      modal.showModal(); // 모달 표시
    } catch (error) {
      alert(error.message);
    }
  });

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  restartButton.addEventListener("click", () => {
    window.location.reload();
  });
});
