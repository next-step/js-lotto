export const LOTTO_NUMBER_COUNT = 6;
export const WINNING_NUMBER_COUNT = 7;
export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const MIN_PRICE = 1000;
export const MAX_PRICE = 100000;
export const ARRAY_FIRST_INDEX = 0;
export const ARRAY_LAST_INDEX = -1;

export const VALIDATE_TYPE = {
  PRICE: 'price',
  WINNING: 'winning'
}

export const ERROR_MESSAGE = {
  MIN_PRICE_MESSAGE: '1,000원 이상 부터 구입 가능합니다.',
  MAX_PRICE_MESSAGE: '100,000원 이하로 구입 가능합니다.',
  INVALID_PRICE: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  DUPLICATED_MESSAGE: '중복된 숫자가 존재합니다.',
  MIN_LOTTO_NUMBER: '1 이상의 숫자만 입력 가능합니다.',
  MAX_LOTTO_NUMBER: '45 이하의 숫자만 입력 가능합니다.',
  REQUIRED: '당첨번호, 보너스 번호를 모두 입력해주세요.'
}
