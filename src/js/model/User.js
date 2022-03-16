export default class User {
  #wallet;

  constructor() {
    this.#wallet = 0;
  }

  buyLotto(seller, machine) {
    const count = seller.calculateLotto(this.#wallet);

    return seller.sellLotto(machine, count);
  }

  set wallet(value) {
    this.#wallet = value;
  }

  get wallet() {
    return this.#wallet;
  }
}
