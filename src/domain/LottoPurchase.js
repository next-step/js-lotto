import { lottoPrice } from "../utils/constants.js";
import Lotto from "./Lotto.js";

class LottoPurchase {
  #lottos = [];

  constructor(purchaseAmount) {
    this.#lottos = this.getLottoTickets(purchaseAmount);
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
