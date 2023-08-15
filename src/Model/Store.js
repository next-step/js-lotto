import { Validator } from '../utils/Validator';

export class Store {
  #products = new Map();
  #validator = Validator.Store;

  constructor(products) {
    Object.entries(products).forEach(([productName, productData]) => {
      this.#products.set(productName, productData);
    });
  }

  buyProduct(productName, purchaseAmount) {
    this.#validator.validateProductName(this.#products, productName);
    const { price: productPrice, product } = this.#products.get(productName);
    this.#validator.validatePurchaseAmount(purchaseAmount, productPrice);

    const productAmount = this.#calculateProductAmount(
      productPrice,
      purchaseAmount
    );

    return Array.from({ length: productAmount }, () => {
      return new product();
    });
  }

  #calculateProductAmount(productPrice, purchaseAmount) {
    return parseInt(purchaseAmount / productPrice);
  }
}
