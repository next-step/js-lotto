import {
  LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "./constants.js";

export const validateLottoNumbers = (lottoNumbers) => {
  if (!Array.isArray(lottoNumbers) || lottoNumbers.length !== 6) {
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
    !Number.isInteger(value) ||
    value < MIN_LOTTO_NUMBER ||
    value > MAX_LOTTO_NUMBER
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

export class InvalidLottoNumberError extends Error {
  constructor() {
    super(
      `로또 번호는 ${MIN_LOTTO_NUMBER} 이상 ${MAX_LOTTO_NUMBER} 이하의 정수여야 합니다.`
    );
  }
}

export class InvalidLottoCountError extends Error {
  constructor() {
    super(`로또 번호는 ${LOTTO_NUMBER_COUNT}개여야 합니다.`);
  }
}

export class DuplicateLottoNumberError extends Error {
  constructor() {
    super("로또 번호는 중복이 없어야 합니다.");
  }
}

export class DuplicateBonusNumberError extends Error {
  constructor() {
    super("당첨 번호와 보너스 번호는 겹칠 수 없습니다.");
  }
}
