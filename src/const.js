export const LOTTO_PRICE = 1000;

export const DEFAULT_PRICE = 0;

export const DEFAULT_LOTTO_COUNT = 0;

export const LOTTO_COUNT = 6;

export const LOTTO_MIN_NUMBER = 1;

export const LOTTO_MAX_NUMBER = 45;

export const LOTTO_BONUS_NUMBER_INDEX = 6;

export const ERROR_MESSAGE = {
  INVALID_UNIT_NUMBER: `${LOTTO_PRICE}단위의 숫자를 입력해주세요.`,
  INVALID_NEGATIVE_NUMBER: `${DEFAULT_PRICE}이상의 숫자를 입력해주세요.`,
  INVALID_RANGE_NUMBER: `${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 사이의 숫자를 입력해주세요.`,
  INVALID_DUPLICATED_NUMBER: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};
