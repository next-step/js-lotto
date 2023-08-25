import {
  PurchasedShouldPositiveError,
  PurchasedShouldMultipleOfThousandError,
} from "./errors.js";

const createRevenueCalculator = () => {
  const LOTTO_PRICE = 1_000;

  function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
  }

  function toPercent(number) {
    const percentage = number * 100;
    return roundToTwoDecimalPlaces(percentage);
  }

  function validatePurchased(purchased) {
    if (purchased <= 0) throw new PurchasedShouldPositiveError();
    if (purchased % LOTTO_PRICE !== 0)
      throw new PurchasedShouldMultipleOfThousandError();
  }

  function getRevenuePercentage(prize, purchased) {
    validatePurchased(purchased);

    return `${toPercent(prize / purchased)}%`;
  }

  return {
    getRevenuePercentage,
  };
};

export default createRevenueCalculator;
