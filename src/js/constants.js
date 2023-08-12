export const RULES = {
  LOTTO_PRICE: 1_000,
  LOTTO_NUMBERS_LENGTH: 6,
  LOTTO_NUMBERS_RANGE: [1, 45],
};

export const ERROR_MESSAGES = {
  INVALID_PURCHASE_MONEY_TYPE: '로또 구입 가격은 숫자만 올 수 있습니다.',
  INVALID_PURCHASE_MONEY_UNIT: `로또 구입은 ${RULES.LOTTO_PRICE}원 단위로 할 수 있습니다.`,
};
