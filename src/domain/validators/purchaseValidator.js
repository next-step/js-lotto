import { PRICE_PER_LOTTO } from "../constants.js";
import { InvalidPurchaseAmount } from "./errors.js";
import { isValidIntegerInRange } from "./utils.js";

export const validatePurchaseAmount = (purchaseAmount) => {
  if (!isValidIntegerInRange({ value: purchaseAmount, min: PRICE_PER_LOTTO })) {
    throw new InvalidPurchaseAmount();
  }
};
