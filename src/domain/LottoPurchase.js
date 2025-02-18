import Lotto from "./Lotto.js";
import Validator from "./Validator.js";
import generateLottoNumber from "../utils/generateRandomNumber.js";
import { lottoPrice } from "../utils/constants.js";

class LottoPurchase {
  #lottoTickets = [];

  constructor(purchaseAmount) {
    const validator = new Validator();
    validator.validatePurchaseAmount(purchaseAmount);
    this.#lottoTickets = this.getLottoTickets(purchaseAmount);
  }

  getLottoTickets(purchaseAmount) {
    const numberOfLottoTickets = purchaseAmount / lottoPrice;

    return Array.from(
      { length: numberOfLottoTickets },
      () => new Lotto(this.generateLottoNumbers())
    );
  }

  generateLottoNumbers() {
    const numbersSet = new Set();

    while (numbersSet.size < 6) {
      const number = generateLottoNumber();
      numbersSet.add(number);
    }

    return [...numbersSet].sort((a, b) => a - b);
  }

  get lottoTickets() {
    return this.#lottoTickets;
  }
}

export default LottoPurchase;
