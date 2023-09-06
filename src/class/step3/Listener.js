import LottoGame from "../LottoGame";
import { UserInputError } from "../Error";

export default class Listener {
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
    try {
      const purchaseForm = document.querySelector("form.purchase");
      const prizeInfoForm = document.querySelector("form.prize-info");
    } catch (e) {
      this.#alertUserInputError(e);
    }
  }
}
