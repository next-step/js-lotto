import { LOTTO_NUMBER_QUANTITY, LOTTO_NUMBER_RANGE, LOTTO_PRICE } from './lotto-config.js';

const ERROR = Object.freeze({
  PURCHASE: {
    UNMATCHED_PRICE_PER_SHEET: `${LOTTO_PRICE.toLocaleString()}원 단위의 금액을 입력해주세요!`,
  },
  WINNING_NUMBERS: {
    UNMATCHED_QUANTITY: `${LOTTO_NUMBER_QUANTITY}개의 숫자를 입력해주세요!`,
    BEYOND_NUMBER_RANGE: `${LOTTO_NUMBER_RANGE.MIN}-${LOTTO_NUMBER_RANGE.MAX} 사이의 숫자들로 입력해주세요!`,
    DO_NOT_ENTER_DUPLICATED_NUMBER: '중복되지 않은 숫자들을 입력해주세요!',
  },
});

export default ERROR;
