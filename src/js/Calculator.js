function roundToSecondDecimalPlace(number) {
  const DECIMAL_PLACES = 2;
  return (
    Math.round(number * Math.pow(10, DECIMAL_PLACES)) /
    Math.pow(10, DECIMAL_PLACES)
  );
}

export function transferToPercent(number) {
  const percentage = number / 100;
  return roundToSecondDecimalPlace(percentage);
}

const Calculator = (function () {
  const ERROR_MESSAGE = Object.freeze({
    LESS_THAN_ZERO: "구매 금액은 0 이상의 양수여야합니다.",
    NOT_MULTIPLE_OF_1000: "구매 금액은 0 이상의 양수여야합니다.",
  });

  function validatePurchase(purchased) {
    const UNIT = 1_000;
    if (purchased <= 0) throw new Error(ERROR_MESSAGE.LESS_THAN_ZERO);
    if (purchased % UNIT !== 0)
      throw new Error(ERROR_MESSAGE.NOT_MULTIPLE_OF_1000);
  }

  function getReturnOfPurchased(prize, purchased) {
    validatePurchase(purchased);

    const accumulatedPrize = prize;

    return transferToPercent(accumulatedPrize / purchased);
  }

  return {
    ERROR_MESSAGE,
    getReturnOfPurchased,
  };
})();

export default Calculator;
