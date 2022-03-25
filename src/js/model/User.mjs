import {calculateLotto, getLottos} from "../module/lotto.js";

export default class User {
  #wallet;

  #purchaseHistory;

  constructor() {
    this.#wallet = 0;
    this.#purchaseHistory = [];
  }

  buyLotto() {
    const count = calculateLotto(this.#wallet);

    this.#purchaseHistory = [
      ...this.#purchaseHistory,
      ...getLottos(count),
    ];
    return this.#purchaseHistory;
  }

  get purchaseHistory() {
    return this.#purchaseHistory;
  }

  set wallet(value) {
    this.#wallet = value;
  }

  get wallet() {
    return this.#wallet;
  }

  get haveLotto() {
    return this.#purchaseHistory.length > 0;
  }
}
