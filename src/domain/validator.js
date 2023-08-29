import {
  DUPLICATE_NOT_ALLOWED,
  ERROR_MESSAGE,
  LOTTO_LENGTH_REQUIRED,
  LOTTO_MIN_PRICE_REQUIRED,
  VALID_NUMBER_REQUIRED,
} from "../utils/errorMessage.js";

import { isValidNumber } from "../utils/validator.js";

import { LOTTO_PRICE, LOTTO_RULES } from "./constant.js";

/**
 * @param {number[]} numberList
 */
const validateLottoDuplicateNumbers = numberList => {
  if (new Set(numberList).size !== numberList.length) {
    throw new Error(ERROR_MESSAGE[DUPLICATE_NOT_ALLOWED]);
  }
};

/**
 * @param {number} amount
 */
const validateLottoPrice = amount => {
  if (amount / LOTTO_PRICE.PRICE < LOTTO_RULES.LOTTO_MIN_NUMBER_ALLOWED) {
    throw new Error(ERROR_MESSAGE[LOTTO_MIN_PRICE_REQUIRED]);
  }
};

/**
 * @param {number[]} numberList
 */
const validateLottoLength = numberList => {
  if (numberList.length < LOTTO_RULES.LOTTO_MIN_LENGTH)
    throw new Error(ERROR_MESSAGE[LOTTO_LENGTH_REQUIRED]);
};

/**
 * @param {number} num
 */
const validateLottoNumber = num => {
  if (!isValidNumber(num) || isNaN(num)) {
    throw new Error(ERROR_MESSAGE[VALID_NUMBER_REQUIRED]);
  }

  if (
    num > LOTTO_RULES.LOTTO_MAX_NUMBER ||
    num < LOTTO_RULES.LOTTO_MIN_NUMBER
  ) {
    throw Error(ERROR_MESSAGE[VALID_NUMBER_REQUIRED]);
  }
};

/**
 * @param {number[]} numberList
 * @param {number} bonusNumber
 */
const validateBonusNumber = (numberList, bonusNumber) => {
  if (numberList.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGE[DUPLICATE_NOT_ALLOWED]);
  }
};

export {
  validateLottoDuplicateNumbers,
  validateLottoPrice,
  validateLottoLength,
  validateLottoNumber,
  validateBonusNumber,
};
