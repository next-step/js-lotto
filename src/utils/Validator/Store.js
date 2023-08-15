import { MESSAGE } from '../../constants';

export const Store = {
  /* Buy Product */
  validateProductName(products, productName) {
    if (!products.has(productName))
      throw new Error(MESSAGE.ERROR.PRODUCT_NOT_FOUND);
  },

  validatePurchaseAmount(purchaseAmount, productPrice) {
    if (purchaseAmount < productPrice)
      throw new Error(MESSAGE.ERROR.INSUFFICIENT_PURCHASE_AMOUNT);
  },
};
