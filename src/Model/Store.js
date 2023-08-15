export class Store {
  #products = new Map();

  constructor() {}

  setProduct(productName, product) {
    this.#products.set(productName, product);
  }

  getProduct(productName, purchaseAmount) {
    const product = this.#products.get(productName);
    const productAmount = calculateProductAmount(product, purchaseAmount);

    return Array.from({ length: productAmount }, () => product.create());
  }

  calculateProductAmount(product, purchaseAmount) {
    const productPrice = product.getPrice();

    return parseInt(purchaseAmount / productPrice);
  }
}
