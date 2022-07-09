import model from "./model.js";
import observable from "../js/util/observable.js";

import { notifyTypes } from "./util/constants.js";

class Controller {
  constructor() {
    this.lottoModel = model;
    this.observable = observable;
  }

  handleBuyLotties(paidMoney) {
    this.lottoModel.buyLotties(paidMoney);
    this.observable.notify(notifyTypes.BUY_LOTTIES, this.lottoModel.curLotties);
  }
}

export default new Controller();
