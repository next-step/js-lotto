import {
  PurchasedShouldPositiveError,
  PurchasedShouldMultipleOfThousandError,
} from "./errors.js";

const createRevenueCalculator = () => {
  const DECIMAL_PLACES = 2;
  const LOTTO_PRICE = 1_000;

  function roundUp(number, decimalPlace = DECIMAL_PLACES) {
    return Math.round(number * Math.pow(10, decimalPlace));
  }

  function toPercent(number) {
    const percentage = number / 100;
    return roundUp(percentage);
  }

  function validatePurchased(purchased) {
    if (purchased <= 0) throw new PurchasedShouldPositiveError();
    if (purchased % LOTTO_PRICE !== 0)
      throw new PurchasedShouldMultipleOfThousandError();
  }

  function getRevenueOnPurchased(revenue, purchased) {
    validatePurchased(purchased);

    return `${toPercent(revenue / purchased)}%`;
  }

  return {
    getRevenueOnPurchased,
  };
};

export default createRevenueCalculator;
