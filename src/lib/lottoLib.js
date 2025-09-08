
const hasComma = (input) => {
  return input.includes(",");
};

const isNumber = (input) => {
  return /^-?\d+(\.\d+)?$/.test(input);
};

const isPriceType = (input) => {
  return !hasComma(input) && isNumber(input);
};

const isBonusNumberType = (input) => {
  return !hasComma(input) && isNumber(input);
};

const isWinnerNumbersType = (input) => {
  if (!hasComma(input)) return false;

  const arrayNumber = input.replace(/ /g, "").split(",");
  const filterIsNumber = arrayNumber.filter((el) => isNumber(el)).length;

  return arrayNumber.length === filterIsNumber;
};

const createTypeCheck = (handlers) => {
  return (type, input) => {
    const checker = handlers[type];
    if (!checker) return false;
    return checker(input);
  };
};

export const checkByType = createTypeCheck({
  PRICE: isPriceType,
  WINNER_NUMBER: isBonusNumberType,
  BONUS_NUMBER: isWinnerNumbersType,
});
