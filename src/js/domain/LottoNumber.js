import {
  ErrorLottoBonusNumber,
  ErrorLottoNumber,
  ErrorLottoNumbers,
} from "../constants/error";

const LottoNumber = {
  LENGTH_LOTTO_NUMBERS: 6,
  MAX_LOTTO_NUMBER: 45,
  MIN_LOTTO_NUMBER: 1,

  validateLottoNumbers(input) {
    if (!Array.isArray(input) && typeof input !== "string") {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_TYPE);
    }

    const lottoNumbers = this.convertLottoNumbersToArray(input);
    const lottoNumbersSet = new Set(lottoNumbers);

    if (lottoNumbers.length !== this.LENGTH_LOTTO_NUMBERS) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_LENGTH);
    }

    if (lottoNumbers.length !== lottoNumbersSet.size) {
      throw new Error(ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED);
    }

    lottoNumbers.forEach((lottoNumber) => {
      this.validateLottoNumber(lottoNumber);
    });
  },

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

  generateRandomLottoNumbers() {
    const lottoNumbers = [];
    const candidateLottoNumbers = Array.from(
      { length: this.MAX_LOTTO_NUMBER },
      (_, i) => i + 1
    );

    for (let i = 0; i < this.LENGTH_LOTTO_NUMBERS; i++) {
      const randomIndex = Math.floor(
        Math.random() * candidateLottoNumbers.length
      );

      const deletedNumbers = candidateLottoNumbers.splice(randomIndex, 1);
      lottoNumbers.push(...deletedNumbers);
    }

    return lottoNumbers;
  },

  convertLottoNumbersToArray(lottoNumbers) {
    if (Array.isArray(lottoNumbers)) {
      return lottoNumbers;
    }

    if (typeof lottoNumbers === "string") {
      return lottoNumbers.split(",").map(Number);
    }

    return [];
  },

  sortLottoNumbersByAscendingOrder(lottoNumbers) {
    return [...lottoNumbers].sort((a, b) => a - b);
  },
};

export default LottoNumber;
