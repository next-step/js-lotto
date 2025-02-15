class Lotto {
  #price;

  #paper = [];

  constructor(price) {
    this.#price = price;
    this.#paper = new Array(this.getAmount());
  }

  get price() {
    return this.#price;
  }

  getAmount() {
    return this.#price / 1000;
  }
  getLottoPapers() {
    return this.#paper;
  }
}

export default Lotto;
