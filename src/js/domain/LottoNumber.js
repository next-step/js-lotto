import { ErrorLottoBonusNumber, ErrorLottoNumber } from "../constants/error";

const LottoNumber = {
  MAX_LOTTO_NUMBER: 45,
  MIN_LOTTO_NUMBER: 1,

  validateBonusNumber(input, winningNumbers) {
    this.validateLottoNumber(input);

    if (winningNumbers.includes(Number(input))) {
      throw new Error(
        ErrorLottoBonusNumber.ERROR_LOTTO_BONUS_NUMBER_DUPLICATED
      );
    }
  },

  validateLottoNumber(input) {
    if (isNaN(input)) {
      throw new Error(ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_NUMBER);
    }

    if (!Number.isInteger(Number(input))) {
      throw new Error(ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER);
    }

    if (
      Number(input) < this.MIN_LOTTO_NUMBER ||
      Number(input) > this.MAX_LOTTO_NUMBER
    ) {
      throw new Error(ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER);
    }
  },
};

export default LottoNumber;
