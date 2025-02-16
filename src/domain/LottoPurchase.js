import { lottoPrice } from "../utils/constants.js";
import Lotto from "./Lotto.js";
import Validator from "./Validator.js";

class LottoPurchase {
  #lottoTickets = [];

  constructor(purchaseAmount) {
    const validator = new Validator();
    validator.validatePurchaseAmount(purchaseAmount);
    this.#lottoTickets = this.getLottoTickets(purchaseAmount);
  }

  getLottoTickets(purchaseAmount) {
    const numberOfLottoTickets = purchaseAmount / lottoPrice;

    return Array.from({ length: numberOfLottoTickets }, () => new Lotto());
  }

  get lottoTickets() {
    return this.#lottoTickets;
  }
}

export default LottoPurchase;
