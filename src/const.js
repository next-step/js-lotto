export const LOTTO_PRICE = 1000;

export const DEFAULT_NUMBER = 0;

export const LOTTO_COUNT = 6;

export const LOTTO_BONUS_APPLICABLE_COUNT = 5;

export const LOTTO_MIN_NUMBER = 1;

export const LOTTO_MAX_NUMBER = 45;

export const ERROR_MESSAGE = {
  INVALID_UNIT_NUMBER: `${LOTTO_PRICE}단위의 숫자를 입력해주세요.`,
  INVALID_NEGATIVE_NUMBER: `${DEFAULT_NUMBER}이상의 숫자를 입력해주세요.`,
  INVALID_RANGE_NUMBER: `${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 사이의 숫자를 입력해주세요.`,
  INVALID_DUPLICATED_NUMBER: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

export const PROFIT = {
  3: {
    COUNT: '3개',
    PRICE: 5000,
  },
  4: {
    COUNT: '4개',
    PRICE: 50000,
  },
  5: {
    COUNT: '5개',
    PRICE: 1500000,
  },
  6: {
    COUNT: '5개 + 보너스볼',
    PRICE: 30000000,
  },
  7: {
    COUNT: '6개',
    PRICE: 2000000000,
  },
};
