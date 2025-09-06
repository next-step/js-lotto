import { LOTTO } from "../constants/lottos.js";
import { ERROR_MESSAGE } from "../constants/message.js";

class InputValidator {
  #validateAmount(amount) {
    if (/^\d+$/.test(amount)) {
      if (amount < LOTTO.PRICE) {
        throw new Error(ERROR_MESSAGE.MIN_PRICE);
      }
      return true;
    }
    throw new Error(ERROR_MESSAGE.ONLY_NUMBER);
  }

  isValidateAmount(amount) {
    return this.#validateAmount(amount);
  }

  validateLottoNumbers(numbersStr) {
    const trimmed = numbersStr.trim();

    if (!/^\d+(,\s*\d+)*$/.test(trimmed)) {
      throw new Error(ERROR_MESSAGE.INVALID_FORMAT);
    }

    if (trimmed < LOTTO.MIN_RANGE || trimmed > LOTTO.MAX_RANGE) {
      throw new Error(ERROR_MESSAGE.MIN_PRICE);
    }

    const splitNumbers = trimmed
      .split(",")
      .map((number) => Number(number.trim()));
    if (splitNumbers.length > LOTTO.SIZE || splitNumbers.length < LOTTO.SIZE) {
      throw new Error(ERROR_MESSAGE.LOTTO_SIZE);
    }

    for (const number of splitNumbers) {
      if (number < LOTTO.MIN_RANGE || number > LOTTO.MAX_RANGE) {
        throw new Error(ERROR_MESSAGE.LOTTO_RANGE);
      }
    }

    return splitNumbers;
  }

  validateBonusNumber(numberStr) {
    if (!numberStr) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
    }

    if (!/^\d+$/.test(numberStr)) {
      throw new Error(ERROR_MESSAGE.ONLY_NUMBER);
    }

    const bonusNumber = Number(numberStr);
    if (bonusNumber < LOTTO.MIN_RANGE || bonusNumber > LOTTO.MAX_RANGE) {
      throw new Error(ERROR_MESSAGE.LOTTO_RANGE);
    }
    return true;
  }
}
export default InputValidator;
