export class Store {
  #products = new Map();

  constructor(products) {
    Object.entries(products).forEach(([productName, productData]) => {
      this.#products.set(productName, productData);
    });
  }

  buyProduct(productName, purchaseAmount) {
    const { price: productPrice, product } = this.#products.get(productName);

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
