import LottoGame from "../LottoGame.js";
import Viewer from "./Viewer";
import { UserInputError } from "../Error";
import { withErrorHandler } from "../../utils/errorFunc";

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

  #withCommonErrorHandler(callback) {
    return withErrorHandler(callback.bind(this), this.#handleError.bind(this));
  }

  #onClickPurchaseButton(payment) {
    this.#lottoGame.issueLottoTickets(Number(payment));
  }

  init() {
    this.#viewer.addPurchaseButtonClickListener(
      this.#withCommonErrorHandler(this.#onClickPurchaseButton),
    );
  }
}
