const PRICE = 1000;

export const ZERO_NUMBER = 0;

const COUNT = 6;

const BONUS_APPLICABLE_COUNT = 5;

const MIN_NUMBER = 1;

const MAX_NUMBER = 45;

export const LOTTO = {
  MAX_NUMBER,
  MIN_NUMBER,
  COUNT,
  PRICE,
  BONUS_APPLICABLE_COUNT,
};

export const ERROR_MESSAGE = {
  INVALID_UNIT_NUMBER: `${LOTTO.PRICE}단위의 숫자를 입력해주세요.`,
  INVALID_NEGATIVE_NUMBER: `${ZERO_NUMBER}이상의 숫자를 입력해주세요.`,
  INVALID_RANGE_NUMBER: `${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 사이의 숫자를 입력해주세요.`,
  INVALID_DUPLICATED_NUMBER: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

export const PROFIT = {
  3: {
    COUNT: '3개',
    PRICE: 5_000,
  },
  4: {
    COUNT: '4개',
    PRICE: 50_000,
  },
  5: {
    COUNT: '5개',
    PRICE: 1_500_000,
  },
  6: {
    COUNT: '5개 + 보너스볼',
    PRICE: 30_000_000,
  },
  7: {
    COUNT: '6개',
    PRICE: 2_000_000_000,
  },
};
