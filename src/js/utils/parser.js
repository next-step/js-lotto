import { isNumber } from "./validator.js";

export const parseDecimal = (value) => parseInt(value, 10);

export const stringifyNumber = (value) => {
  if (isNumber(value)) {
    return Intl.NumberFormat("en-US").format(value);
  } else {
    throw new TypeError("Value should be a number");
  }
};
