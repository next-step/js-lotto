import LottoGame from "../LottoGame";
import { UserInputError } from "../Error";

import {
  closeResultModal,
  openResultModal,
  printPrizeInfo,
  printPurchaseInfoAndPrizeInfo,
  printWinningNumberInputs,
  removePurchaseInfo,
  resetPrizeInfo,
} from "./Viewer";

export default class App {
  #lottoGame;

  constructor(lottoGame = new LottoGame()) {
    if (!(lottoGame instanceof LottoGame)) {
      throw new Error("올바른 로또 게임이 아닙니다.");
    }

    this.#lottoGame = lottoGame;

    this.#init();
  }

  #alertUserInputError(error) {
    if (error instanceof UserInputError) {
      alert(error.message);
    }
  }

  #init() {
    printWinningNumberInputs(this.#lottoGame.getTicketNumbersLength());

    try {
      const purchaseForm = document.querySelector("form.purchase");
      const prizeInfoForm = document.querySelector("form.prize-info");
      const restartButton = document.querySelector("button.restart");

      purchaseForm.addEventListener("submit", (evt) => {
        evt.preventDefault();

        if (this.#lottoGame.stage === "SET_PAYMENT") {
          this.#lottoGame.issueLottoTickets(Number(evt.target[0].value));

          printPurchaseInfoAndPrizeInfo(
            this.#lottoGame.getLottoAmount(),
            this.#lottoGame.getLottoTickets(),
          );

          this.#lottoGame.stage = "SET_WINNING_NUMBERS";
          return;
        }

        alert("이미 로또를 구매하였습니다.");
      });

      prizeInfoForm.addEventListener("submit", (evt) => {
        evt.preventDefault();

        if (this.#lottoGame.stage === "SET_PAYMENT") {
          alert("로또를 먼저 구매해 주세요");
          return;
        }

        const target = evt.target;

        const winningNumbers = Array.from(
          { length: this.#lottoGame.getTicketNumbersLength() },
          (_, index) => target[index].value,
        )
          .filter((value) => value.trim().length > 0)
          .map(Number);

        const bonusNumber = Number(
          target[this.#lottoGame.getTicketNumbersLength()].value,
        );

        this.#lottoGame.setWinningNumbers(winningNumbers);

        this.#lottoGame.setBonusNumber(bonusNumber);

        printPrizeInfo(
          this.#lottoGame.getTotalPrize(),
          this.#lottoGame.getProfitRatio(),
        );

        openResultModal();
      });

      restartButton.addEventListener("click", () => {
        resetPrizeInfo();
        removePurchaseInfo();
        closeResultModal();
      });
    } catch (e) {
      this.#alertUserInputError(e);
    }
  }
}
