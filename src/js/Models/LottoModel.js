import { isNumber, isDivisible, randomInt } from "../utils.js";
import { PRICE_PER_LOTTO } from "../constants.js";

import { Model } from "./Model.js";

export class LottoModel extends Model {
  MAX_NUMBER = 45;
  MIN_NUMBER = 1;
  NUMBER_OF_SELECTABLE_LOTTOS = 5;
  state = {
    numOfLottos: 0,
    lottos: [],
    isVisualizeLottoNumbers: false,
  };

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
      throw new TypeError("Type of charge must be nnumber");
    }

    if (!isDivisible(charge, PRICE_PER_LOTTO)) {
      throw new Error(`${PRICE_PER_LOTTO}원 단위로 구매해 주세요.`);
    }

    return true;
  }

  purchase(e) {
    e.preventDefault();
    const charge = Number(new FormData(e.target).get("charge"));
    if (this.#validateCharge(charge)) {
      const numOfLottos = charge / PRICE_PER_LOTTO;
      this.setState({
        numOfLottos,
        lottos: this.#generateLottos(numOfLottos),
      });
    }
  }

  toggleLottoNumbers() {
    this.setState({
      isVisualizeLottoNumbers: !this.state.isVisualizeLottoNumbers,
    });
  }
}
