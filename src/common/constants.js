export const ERROR_MESSAGES = Object.freeze({
  priceForm: {
    INVALID_PRICE_UNIT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
    RANGE_UNDERFLOW: '값은 1000 이상이어야 합니다.',
    RANGE_OVERFLOW: '값은 100000 이하여야 합니다.',
    VALUE_MISSING: '이 입력란을 작성하세요.',
  },
});

export const PRICE_UNIT = 1000;
export const PRICE_LIMIT = 100000;

const CONSTANTS = Object.freeze({
  INITIAL: {
    IS_PREVIOUS_PURCHASE_OFF: false,
    USER_INPUT_PRICE: null,
    VISIABLE_LOTTO_TOGGLE_OFF: false,
    MY_LOTTOS: [],
    LOTTO_WINNING_NUMBER: [],
    LOTTO_BONUS_NUMBER: null,
  },
  COMMON: {
    IS_PREVIOUS_PURCHASE_ON: true,
    VISIABLE_LOTTO_TOGGLE_ON: true,
    PRICE_UNIT,
    PRICE_LIMIT,
    LOTTO_MAX_SIZE: 6,
    LOTTO_MAX_NUMBER: 45,
  },
});

export default CONSTANTS;
