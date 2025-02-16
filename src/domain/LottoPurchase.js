import { lottoPrice } from "../utils/constants.js";
import Lotto from "./Lotto.js";
import Validator from "./Validator.js";

class LottoPurchase {
  #lottos = [];

  constructor(purchaseAmount) {
    const validator = new Validator();
    const verifiedPurchaseAmount =
      validator.validatePurchaseAmount(purchaseAmount);
    this.#lottos = this.getLottoTickets(verifiedPurchaseAmount);
  }

  getLottoTickets(purchaseAmount) {
    const numberOfLottoTickets = purchaseAmount / lottoPrice;
    
    return Array.from({ length: numberOfLottoTickets }, () => new Lotto());
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoPurchase;
