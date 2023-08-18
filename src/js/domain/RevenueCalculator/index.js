import {
  PurchasedShouldPositiveError,
  PurchasedShouldMultipleOfThousandError,
} from "./errors";

export default createRevenueCalculator = () => {
  const DECIMAL_PLACES = 2;

  function roundUp(number, decimalPlace = DECIMAL_PLACES) {
    return Math.round(number * Math.pow(10, decimalPlace));
  }

  function toPercent(number) {
    const percentage = number / 100;
    return roundUp(percentage);
  }

  function validatePurchased(purchased) {
    const LOTTO_PRICE = 1_000;
    if (purchased <= 0) throw new PurchasedShouldPositiveError();
    if (purchased % LOTTO_PRICE !== 0)
      throw new PurchasedShouldMultipleOfThousandError();
  }

  function getRevenueOverPurchased(prize, purchased) {
    validatePurchased(purchased);

    const accumulatedPrize = prize;

    return `${toPercent(accumulatedPrize / purchased)}%`;
  }

  return {
    getRevenueOverPurchased,
  };
};
