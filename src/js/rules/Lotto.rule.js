import { LOTTO_LENGTH, MAXIMUM_LOTTO_NUMBER, MINIMUM_LOTTO_NUMBER } from "../constants";
import {
  LOTTO_NUMBER_TYPE_ERR_MSG,
  LOTTO_NUMBER_DUPLICATED_ERR_MSG,
  LOTTO_NUMBER_RANGE_ERR_MSG,
  LOTTO_NUMBER_LENGTH_ERR_MSG,
} from "../constants/error";
import { Lotto } from "../domain/Lotto";

export const lottoRule = {
  /**
   * @param {number[]} numbers
   */
  validates(numbers) {
    if (!this.isNumberValid(numbers)) throw new Error(LOTTO_NUMBER_TYPE_ERR_MSG);
    if (!this.isNumberDuplicated(numbers)) throw new Error(LOTTO_NUMBER_DUPLICATED_ERR_MSG);
    if (!this.isNumberLengthValid(numbers)) throw new Error(LOTTO_NUMBER_LENGTH_ERR_MSG);
    if (!this.isNumberRangeValid(numbers)) throw new Error(LOTTO_NUMBER_RANGE_ERR_MSG);

    return true;
  },

  isNumberValid(numbers) {
    return numbers?.every((number) => typeof number === "number" && !isNaN(number));
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
   * @param {number} number
   * @param {Lotto} winningNumbers
   */
  validates(number, winningNumbers) {
    if (!this.isNumberValid(number)) throw new Error(LOTTO_NUMBER_TYPE_ERR_MSG);
    if (!this.isNumberRangeValid(number)) throw new Error(LOTTO_NUMBER_RANGE_ERR_MSG);
    if (this.isNumberDuplicated(number, winningNumbers))
      throw new Error(LOTTO_NUMBER_DUPLICATED_ERR_MSG);

    return true;
  },

  isNumberValid(number) {
    return typeof number === "number" && !isNaN(number);
  },

  isNumberRangeValid(number) {
    return number >= MINIMUM_LOTTO_NUMBER && number <= MAXIMUM_LOTTO_NUMBER;
  },

  isNumberDuplicated(number, winningNumbers) {
    return winningNumbers.numbers.includes(number);
  },
};
