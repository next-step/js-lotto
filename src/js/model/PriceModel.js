export default class PriceModel {
  #price;

  constructor() {
    this.resetPrice();
  }

  updatePrice(newPrice) {
    this.#price = newPrice;
  }

  resetPrice() {
    this.#price = '';
  }

  getPrice() {
    return this.#price;
  }
}
