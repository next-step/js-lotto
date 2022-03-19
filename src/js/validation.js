export const canBeDividedBy1000 = (inputNumber) => {
  if (inputNumber <= 0) {
    return false;
  }
  return inputNumber % 1000 === 0;
};

export const isNumber = (input) => {
  return typeof input === "number";
};
