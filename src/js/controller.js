import model from "./model.js";
import observable from "../js/util/observable.js";

import { notifyTypes } from "./util/constants.js";

class Controller {
  constructor() {
    this.lottoModel = model;
  }

  handleBuyLottiesBtnClick(paidMoney) {
    this.lottoModel.buyLotties(paidMoney);
    observable.notify(notifyTypes.BUY_LOTTIES, this.lottoModel.curLotties);
  }

  handleShowLottieNumBtnToggle() {
    const lottieNumbers = this.lottoModel.curLotties.map((numbers) => numbers.join(", "));
    observable.notify(notifyTypes.TOGGLE_SHOW_LOTTIES_NUMBERS, lottieNumbers);
  }

  handleInputWinningLottoDigits(index, digit) {
    this.lottoModel.setWinningLottoDigits(index, digit);
  }

  canShowModal() {
    return !this.lottoModel.winningLottoDigits.some((number) => number <= 0 || number > 45);
  }

  handleModalOpen() {
    console.log("open");
  }

  handleModalClose() {
    console.log("close");
  }
}

export default new Controller();
