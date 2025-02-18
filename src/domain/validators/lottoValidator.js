import {
  LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "../constants.js";
import {
  DuplicateBonusNumberError,
  DuplicateLottoNumberError,
  InvalidLottoCountError,
  InvalidLottoNumberError,
} from "./errors.js";
import { isValidIntegerInRange } from "./utils.js";

export const validateLottoNumbers = (lottoNumbers) => {
  if (
    !Array.isArray(lottoNumbers) ||
    lottoNumbers.length !== LOTTO_NUMBER_COUNT
  ) {
    throw new InvalidLottoCountError();
  }

  const uniqueNumbers = new Set(lottoNumbers);
  if (uniqueNumbers.size !== LOTTO_NUMBER_COUNT) {
    throw new DuplicateLottoNumberError();
  }

  for (const number of lottoNumbers) {
    validateLottoNumber(number);
  }
};

export const validateLottoNumber = (value) => {
  if (
    !isValidIntegerInRange({
      value,
      min: MIN_LOTTO_NUMBER,
      max: MAX_LOTTO_NUMBER,
    })
  ) {
    throw new InvalidLottoNumberError();
  }
};

export const validateBonusNumber = (winningNumbers, bonusNumber) => {
  validateLottoNumber(bonusNumber);
  if (winningNumbers.includes(bonusNumber)) {
    throw new DuplicateBonusNumberError();
  }
};
