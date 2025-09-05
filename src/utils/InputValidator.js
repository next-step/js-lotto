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

  #validateLottoNumbers(numbers) {
    if (/^\d+(,\s*\d+)*$/.test(numbers)) {
      if (numbers < LOTTO.MIN_RANGE || numbers > LOTTO.MAX_RANGE) {
        throw new Error(ERROR_MESSAGE.MIN_PRICE);
      }
      const splitNumbers = numbers
        .split(",")
        .map((number) => Number(number.trim()));

      if (
        splitNumbers.length > LOTTO.SIZE ||
        splitNumbers.length < LOTTO.SIZE
      ) {
        throw new Error(ERROR_MESSAGE.LOTTO_SIZE);
      }

      for (const number of splitNumbers) {
        if (number < LOTTO.MIN_RANGE || number > LOTTO.MAX_RANGE) {
          throw new Error(ERROR_MESSAGE.LOTTO_RANGE);
        }
      }

      return true;
    }
  }

  isValidWinningNumbers(number) {
    return this.#validateLottoNumbers(number);
  }

  #validateBonusNumber(number) {
    if (!number) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
    }
    if (!/^\d+$/.test(number)) {
      throw new Error(ERROR_MESSAGE.ONLY_NUMBER);
    }
    const bonusNumber = Number(number);
    if (bonusNumber < LOTTO.MIN_RANGE || bonusNumber > LOTTO.MAX_RANGE) {
      throw new Error(ERROR_MESSAGE.LOTTO_RANGE);
    }
    return true;
  }

  isValidateBonusNumber(number) {
    return this.#validateBonusNumber(number);
  }
}
export default InputValidator;
