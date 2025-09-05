import {
  LOTTO_BONUS_NUMBER_TYPE,
  LOTTO_PRICE_TYPE,
  LOTTO_WINNER_NUMBERS_TYPE,
} from "../constants/lotto.js";

const isComma = (input) => {
  if (input.includes(",")) {
    return true;
  }

  return false;
};

const isNumber = (input) => {
  return /^-?\d+(\.\d+)?$/.test(input);
};

export const checkByType = (type, input) => {
  if (
    (type === LOTTO_PRICE_TYPE || type === LOTTO_BONUS_NUMBER_TYPE) &&
    !isComma(input)
  ) {
    return isNumber(input);
  }

  if (type === LOTTO_WINNER_NUMBERS_TYPE && isComma(input)) {
    const arrayNumber = input.replace(/ /g, "").split(",");
    const filterIsNumber = arrayNumber.filter((el) => isNumber(el)).length;

    return arrayNumber.length === filterIsNumber;
  }

  return false;
};
