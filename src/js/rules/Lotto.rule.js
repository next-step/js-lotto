import { LOTTO_LENGTH, MAXIMUM_LOTTO_NUMBER, MINIMUM_LOTTO_NUMBER } from "../constants";
import {
  LOTTO_NUMBER_TYPE_ERR_MSG,
  LOTTO_NUMBER_DUPLICATED_ERR_MSG,
  LOTTO_NUMBER_RANGE_ERR_MSG,
  LOTTO_NUMBER_LENGTH_ERR_MSG,
} from "../constants/error";
import { isInputNumber } from "./common.rule";

export const lottoRule = {
  /**
   * @param {string[]} input
   */
  validates(input) {
    let numbers = input.split(",");
    if (!this.isNumberValid(numbers)) throw new Error(LOTTO_NUMBER_TYPE_ERR_MSG);
    if (!this.isNumberDuplicated(numbers)) throw new Error(LOTTO_NUMBER_DUPLICATED_ERR_MSG);
    if (!this.isNumberLengthValid(numbers)) throw new Error(LOTTO_NUMBER_LENGTH_ERR_MSG);
    if (!this.isNumberRangeValid(numbers)) throw new Error(LOTTO_NUMBER_RANGE_ERR_MSG);

    return true;
  },

  isNumberValid(numbers) {
    return numbers.every((number) => isInputNumber(number));
  },

  isNumberDuplicated(numbers) {
    return new Set(numbers).size === numbers.length;
  },

  isNumberLengthValid(numbers) {
    return numbers.length === LOTTO_LENGTH;
  },

  isNumberRangeValid(numbers) {
    return numbers.every(
      (number) => number >= MINIMUM_LOTTO_NUMBER && number <= MAXIMUM_LOTTO_NUMBER
    );
  },
};

export const bonusNumberRule = {
  /**
   * @param {string} input
   * @param {string[]} winningNumbers
   */
  validates(input, winningNumbers) {
    if (!isInputNumber(input)) throw new Error(LOTTO_NUMBER_TYPE_ERR_MSG);
    if (!this.isNumberRangeValid(input)) throw new Error(LOTTO_NUMBER_RANGE_ERR_MSG);
    if (this.isNumberDuplicated(input, winningNumbers))
      throw new Error(LOTTO_NUMBER_DUPLICATED_ERR_MSG);

    return true;
  },

  isNumberRangeValid(input) {
    return input >= MINIMUM_LOTTO_NUMBER && input <= MAXIMUM_LOTTO_NUMBER;
  },

  isNumberDuplicated(input, winningNumbers) {
    return winningNumbers.includes(+input);
  },
};
