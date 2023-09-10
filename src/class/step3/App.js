import LottoGame from "../LottoGame";
import { UserInputError } from "../Error";

import { printWinningNumberInputs } from "./Viewer";

import {
  handlePurchaseFormSubmit,
  handlePrizeFormSubmit,
  handleRestartButtonClick,
} from "./EventListener";

export default class App {
  #lottoGame;

  constructor(lottoGame = new LottoGame()) {
    if (!(lottoGame instanceof LottoGame)) {
      throw new Error("올바른 로또 게임이 아닙니다.");
    }

    this.#lottoGame = lottoGame;

    printWinningNumberInputs(this.#lottoGame.getTicketNumbersLength());

    const purchaseForm = document.querySelector("form.purchase");
    const prizeInfoForm = document.querySelector("form.prize-info");
    const restartButton = document.querySelector("button.restart");

    purchaseForm.addEventListener("submit", (evt) =>
      handlePurchaseFormSubmit(
        this.getLottoGame(),
        this.#alertUserInputError.bind(this),
        evt,
      ),
    );

    prizeInfoForm.addEventListener("submit", (evt) =>
      handlePrizeFormSubmit(
        this.getLottoGame(),
        this.#alertUserInputError.bind(this),
        evt,
      ),
    );

    restartButton.addEventListener("click", () =>
      handleRestartButtonClick(this.getLottoGame()),
    );
  }

  #alertUserInputError(error) {
    if (error instanceof UserInputError) {
      alert(error.message);
    }
  }

  getLottoGame() {
    return this.#lottoGame;
  }
}
