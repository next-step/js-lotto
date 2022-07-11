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

  handleShowLottieNumBtnToggle(lottieListContainer) {
    lottieListContainer.toggleClass("flex-col");

    const lottieNumbers = this.lottoModel.curLotties.map((numbers) =>
      numbers.join(", ")
    );
    observable.notify(notifyTypes.TOGGLE_SHOW_LOTTIES_NUMBERS, lottieNumbers);
  }
}

export default new Controller();
