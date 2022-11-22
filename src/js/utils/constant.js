export const UNIT_OF_PRICE = 1000;
export const MAX_PRICE = 100000;
export const LOTTO_COUNT = 6;
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;

export const ERROR_MESSAGES = {
  INCORRECT_UNIT_OF_PRICE: `로또 구입 금액을 ${UNIT_OF_PRICE}원 단위로 입력해 주세요.`,
  EXCEED_PRICE: `로또 구입 금액은 ${MAX_PRICE}을 넘지 않아야 합니다.`,
  CANNOT_NEGATIVE_PRICE: '로또 구입 금액은 양수여야 합니다.',
  INCORRECT_TYPE_OF_PRICE: '금액은 숫자여야만 합니다.',
};

export const INITIAL_STATE = {
  purchasePrice: 0,
  ticketCount: 0,
  tickets: [],
  isNumberVisible: false,
};
