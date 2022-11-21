// model
import { checkAmountUnit } from "./utils.js";
import { MESSAGE_ABOUT_UNIT_OF_AMOUNT } from "./constants.js";

class Lotto {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  purchaseLotto(amount) {
    if (!checkAmountUnit(amount)) {
      alert(MESSAGE_ABOUT_UNIT_OF_AMOUNT);
      return;
    }
    console.log("통과");
  }
}

export default Lotto;
