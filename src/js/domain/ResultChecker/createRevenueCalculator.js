import {
  PurchasedShouldPositiveError,
  PurchasedShouldMultipleOfThousandError,
} from "./errors.js";

const createRevenueCalculator = () => {
  const LOWER_DECIMAL_PLACE = 2;
  const LOTTO_PRICE = 1_000;

  function toPercent(number) {
    return number.toFixed(LOWER_DECIMAL_PLACE);
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
