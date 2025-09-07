export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const MAX_LOTTO_NUMBER_COUNT = 6;

export const ERROR_MESSAGES = {
  INVALID_COUNT: `로또는 ${MAX_LOTTO_NUMBER_COUNT}개의 숫자를 가진다`,
  DUPLICATE_NUMBERS: `로또는 ${MAX_LOTTO_NUMBER_COUNT}개의 중복 없는 숫자를 가진다`,
  OUT_OF_RANGE: `로또는 ${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER} 사이의 숫자를 가진다`,
};
