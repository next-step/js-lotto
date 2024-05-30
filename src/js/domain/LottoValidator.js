import { LOTTO_LENGTH, MAXIMUM_LOTTO_NUMBER, MINIMUM_LOTTO_NUMBER } from "../constants";
import {
  LOTTO_NUMBER_DUPLICATED_ERR_MSG,
  LOTTO_NUMBER_LENGTH_ERR_MSG,
  LOTTO_NUMBER_RANGE_ERR_MSG,
  LOTTO_NUMBER_TYPE_ERR_MSG,
} from "../constants/error";

export class LottoNumberValidator {
  validates(number) {
    if (!this.isNumberValid(number)) throw new Error(LOTTO_NUMBER_TYPE_ERR_MSG);
    if (!this.isNumberRangeValid(number)) throw new Error(LOTTO_NUMBER_RANGE_ERR_MSG);

    return true;
  }

  isNumberValid(number) {
    return typeof number === "number" && !isNaN(number);
  }

  isNumberRangeValid(number) {
    return number >= MINIMUM_LOTTO_NUMBER && number <= MAXIMUM_LOTTO_NUMBER;
  }
}

export class LottoValidator extends LottoNumberValidator {
  validates(numbers) {
    numbers.forEach((number) => super.validates(number));
    if (!this.isNumberDuplicated(numbers)) throw new Error(LOTTO_NUMBER_DUPLICATED_ERR_MSG);
    if (!this.isNumberLengthValid(numbers)) throw new Error(LOTTO_NUMBER_LENGTH_ERR_MSG);

    return true;
  }

  isNumberLengthValid(numbers) {
    return numbers.length === LOTTO_LENGTH;
  }

  isNumberDuplicated(numbers) {
    return new Set(numbers).size === numbers.length;
  }
}

export class WinningLottoValidator extends LottoNumberValidator {
  #lottoValidator = new LottoValidator();

  validates(winningNumbers, bonusNumber) {
    this.#lottoValidator.validates(winningNumbers.numbers);
    super.validates(bonusNumber);
    if (this.isBonusNumberDuplicated(winningNumbers, bonusNumber))
      throw new Error(LOTTO_NUMBER_DUPLICATED_ERR_MSG);

    return true;
  }

  isBonusNumberDuplicated(winningNumbers, bonusNumber) {
    return winningNumbers.numbers.includes(bonusNumber);
  }
}
