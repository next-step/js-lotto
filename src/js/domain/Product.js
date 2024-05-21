import { ERROR_MESSAGE } from '../constants';
import ThrowMessage from '../utils/ThrowMessage';

class Product {
  #name;
  #price;

  constructor(name, price) {
    new ThrowMessage(name).isString().callback((value) => {
      if (value.trim().length === 0 || value.trim().length > 15) {
        throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
      }
    });

    new ThrowMessage(price).isInteger().maxSafeInteger();

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
