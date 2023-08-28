import LottoGame from "../LottoGame.js";
import Viewer from "./Viewer";
import { UserInputError } from "../Error";

export default class Controller {
  #viewer;
  #lottoGame;

  constructor(lottoGame = new LottoGame()) {
    if (!(lottoGame instanceof LottoGame)) {
      throw new Error("올바른 로또 게임이 아닙니다.");
    }

    this.#lottoGame = lottoGame;
    this.#viewer = new Viewer();
  }

  #handleError(error) {
    if (error instanceof UserInputError) {
      alert(error.message);
    }
  }

  #onClickPurchaseButton(payment) {
    try {
      this.#lottoGame.issueLottoTickets(Number(payment));
    } catch (error) {
      this.#handleError(error);
    }
  }

  init() {
    this.#viewer.addPurchaseButtonClickListener(
      this.#onClickPurchaseButton.bind(this),
    );
  }
}
