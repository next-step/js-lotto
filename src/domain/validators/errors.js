import {
  LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  PRICE_PER_LOTTO,
} from "../constants.js";

export class InvalidPurchaseAmount extends Error {
  constructor() {
    super(`구입 금액은 ${PRICE_PER_LOTTO}원 이상의 정수여야 합니다.`);
  }
}

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
