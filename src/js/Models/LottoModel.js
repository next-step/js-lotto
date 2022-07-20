import { randomInt } from "../utils/randomInt.js";
import { stringifyNumber } from "../utils/parser.js";
import { isNumber, isDivisible } from "../utils/validator.js";
import { PRICE_PER_LOTTO, MAX_CHARGE_FOR_BUY_LOTTOS } from "../utils/constants.js";

import { Model } from "./Model.js";

export class LottoModel extends Model {
  MAX_NUMBER = 45;
  MIN_NUMBER = 1;
  NUMBER_OF_SELECTABLE_LOTTOS = 6;

  #generateLotto() {
    const lotto = new Set();
    while (lotto.size < this.NUMBER_OF_SELECTABLE_LOTTOS) {
      lotto.add(randomInt(this.MIN_NUMBER, this.MAX_NUMBER));
    }
    return Array.from(lotto);
  }

  #generateLottos(numOfLotto) {
    return Array(numOfLotto)
      .fill(undefined)
      .map(() => this.#generateLotto());
  }

  #validateCharge(charge) {
    if (!isNumber(charge)) {
      throw new TypeError("Type of charge must be number");
    }

    if (charge > MAX_CHARGE_FOR_BUY_LOTTOS) {
      throw new Error(`${stringifyNumber(MAX_CHARGE_FOR_BUY_LOTTOS)}원이상 구매할 수 없습니다.`);
    }

    if (!isDivisible(charge, PRICE_PER_LOTTO)) {
      throw new Error(`${stringifyNumber(PRICE_PER_LOTTO)}원 단위로 구매해 주세요.`);
    }

    return true;
  }

  purchase(charge) {
    if (this.#validateCharge(charge)) {
      const numOfLottos = charge / PRICE_PER_LOTTO;
      this.state = {
        numOfLottos,
        lottos: this.#generateLottos(numOfLottos),
      };
    }
  }

  toggleLottoNumbers() {
    this.state = {
      isVisualizeLottoNumbers: !this.state.isVisualizeLottoNumbers,
    };
  }
}
