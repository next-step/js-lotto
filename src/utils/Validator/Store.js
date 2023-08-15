export const Store = {
  /* Buy Product */
  validateProductName(products, productName) {
    if (!products.has(productName)) throw new Error('제품을 찾을 수 없습니다.');
  },

  validatePurchaseAmount(purchaseAmount, productPrice) {
    if (purchaseAmount < productPrice)
      throw new Error('구입 금액보다 상품의 가격이 높습니다.');
  },
};
