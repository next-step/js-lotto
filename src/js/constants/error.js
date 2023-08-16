import { LOTTO_NUMBER_QUANTITY, LOTTO_PRICE } from './lotto-config.js';

const ERROR = Object.freeze({
  PURCHASE: {
    UNMATCHED_PRICE_PER_SHEET: `${LOTTO_PRICE.toLocaleString()}원 단위의 금액을 입력해주세요!`,
  },
  WINNING_NUMBERS: {
    UNMATCHED_QUANTITY: `${LOTTO_NUMBER_QUANTITY}개의 숫자를 입력해주세요!!`,
  },
});

export default ERROR;
