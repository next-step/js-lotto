const canBeDividedBy1000 = (inputNumber) => {
  if (inputNumber <= 0) {
    return false;
  }
  return inputNumber % 1000 === 0;
};

const isNumber = (input) => {
  return typeof input === "number";
};

export const isValidPriceInput = (inputNumber) => {
  return isNumber(inputNumber) && canBeDividedBy1000(inputNumber);
};
