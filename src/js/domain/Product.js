import ThrowMessage from '../utils/ThrowMessage';

class Product {
  #name;
  #price;

  constructor(name, price) {
    new ThrowMessage(name.trim()).string().minLength(1).maxLength(15);

    new ThrowMessage(price).integer().maxSafeInteger();

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
