import { LOTTO } from "../constants/lottos.js";
import Lotto from "./Lotto.js";

class LottoGenerator {
  static #generateRandomNumbers() {
    const numbers = new Set();

    while (numbers.size < LOTTO.SIZE) {
      const randomNumber = Math.floor(Math.random() * LOTTO.MAX_RANGE) + 1;
      numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  static issueLottoTicket(count) {
    const lottos = [];

    for (let i = 0; i < count; i++) {
      const numbers = this.#generateRandomNumbers();
      lottos.push(new Lotto(numbers));
    }
    return lottos;
  }
}

export default LottoGenerator;
