import ThrowMessage from '../utils/ThrowMessage';

class Product {
  #name;
  #price;

  constructor(name, price) {
    new ThrowMessage(name.trim()).isString().minLength(1).maxLength(15);

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
