import { LOTTO_LENGTH, LOTTO_PRICE, MAXIMUM_LOTTO_NUMBER } from "../constants";
import Lotto from "./Lotto";
import View from "./View";

class LottoMachine {
  lottos = [];
  constructor() {}

  buy(money) {
    const theNumberOfLottos = this.getTheNumberOfLottos(money);
    this.lottos = Array.from({ length: theNumberOfLottos }, () => this.generateLotto());

    View.printLottoInfo(this.lottos);
    return this.lottos;
  }

  getTheNumberOfLottos(money) {
    return money / LOTTO_PRICE;
  }

  generateLotto() {
    const randomNumbers = Array.from({ length: LOTTO_LENGTH }, () => this.generateRandomNumbers());
    return new Lotto(randomNumbers);
  }

  generateRandomNumbers() {
    return Math.floor(Math.random() * MAXIMUM_LOTTO_NUMBER) + 1;
  }
}

export default LottoMachine;
