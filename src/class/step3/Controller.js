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
    if (this.#lottoGame.stage === "SET_PAYMENT") {
      this.#lottoGame.issueLottoTickets(Number(payment));
      this.#viewer.createPurchaseInfo(
        this.#lottoGame.getLottoAmount(),
        this.#lottoGame.getLottoTickets(),
      );
      this.#viewer.addSwitchClickListener();
      this.#lottoGame.stage = "SET_WINNING_NUMBERS";
      return;
    }

    alert("이미 로또를 구매하였습니다.");
  }

  #onClickOpenResultModalButton(winningNumbers, bonusNumber) {
    if (this.#lottoGame.stage === "SET_PAYMENT") {
      alert("로또를 먼저 구매해 주세요");
      return;
    }

    this.#lottoGame.setWinningNumbers(winningNumbers);

    this.#lottoGame.setBonusNumber(bonusNumber);

    this.#viewer.setPrizeInfo(
      this.#lottoGame.getTotalPrize(),
      this.#lottoGame.getProfitRatio(),
    );

    this.#viewer.openResultModal();
  }

  #onClickRestartButton() {
    this.#viewer.reset();
    this.#lottoGame.reset();
  }

  init() {
    this.#viewer.addPurchaseButtonClickListener(
      this.#withCommonErrorHandler(this.#onClickPurchaseButton),
    );

    this.#viewer.addOpenResultModalButtonClickHandler(
      this.#withCommonErrorHandler(this.#onClickOpenResultModalButton),
    );

    this.#viewer.addResetButtonClickHandler(
      this.#onClickRestartButton.bind(this),
    );
  }
}
