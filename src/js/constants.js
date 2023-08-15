export const RULES = {
  LOTTO_PRICE: 1_000,
  LOTTO_NUMBERS_LENGTH: 6,
  LOTTO_NUMBERS_RANGE: [1, 45],
};

export const ERROR_MESSAGES = {
  INVALID_PURCHASE_MONEY_TYPE: '로또 구입 가격은 숫자만 올 수 있습니다.',
  INVALID_PURCHASE_MONEY_UNIT: `로또 구입은 ${RULES.LOTTO_PRICE}원 단위로 할 수 있습니다.`,
  INVALID_LOTTO_NUMBERS_RANGE: `로또 번호는 ${RULES.LOTTO_NUMBERS_RANGE[0]} ~ ${RULES.LOTTO_NUMBERS_RANGE[1]} 사이의 정수만 입력할 수 있습니다.`,
  DUPLICATED_LOTTO_NUMBERS: '로또 당첨 번호로 중복된 값이 올 수 없습니다.',
  INVALID_LOTTO_NUMBERS_LENGTH:
    '당첨번호 6자리 + 보너스 번호 1자리로 설정해주세요.',
};
