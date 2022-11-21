// model
import { checkAmountUnit } from "./utils.js";
import { MESSAGE_ABOUT_UNIT_OF_AMOUNT } from "./constants.js";

class Lotto {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  get() {
    return this.#lottos;
  }

  // #generatorLotto(amount) {
  // [["1", "2", "3", "4", "5", "6"]];
  // }

  purchaseLotto(amount) {
    if (!checkAmountUnit(amount)) {
      alert(MESSAGE_ABOUT_UNIT_OF_AMOUNT);
    }

    // this.#generatorLotto(amount);
  }
}

export default Lotto;
