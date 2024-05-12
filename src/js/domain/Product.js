import { ERROR_MESSAGE } from '../constants';

class Product {
  #name;
  #price;

  constructor(name, price) {
    if (typeof name !== 'string') {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (name.trim().length === 0) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (name.trim().length > 15) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (price > Number.MAX_SAFE_INTEGER || !Number.isInteger(price)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    this.#name = name.trim();
    this.#price = price;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }
}

export default Product;
