import { LOTTO_RETRY_CODE } from './lotto-config.js';

const ERROR = Object.freeze({
  UNMATCHED_PRICE_PER_SHEET: (price) => `${price.toLocaleString()}원 단위의 금액을 입력해주세요!`,

  BEYOND_NUMBER_RANGE: (min, max) => `${min} ~ ${max} 사이의 숫자들로 입력해주세요!`,

  UNMATCHED_QUANTITY: (quantity) => `${quantity}개의 숫자를 입력해주세요!`,
  DO_NOT_ENTER_DUPLICATED_NUMBER: '중복되지 않은 숫자들을 입력해주세요!',

  DUPLICATED_WITH_WINNING_NUMBER: '당첨번호와 중복되지 않는 보너스 숫자를 입력해주세요!',

  INVALID_RETRY_CODE: `${LOTTO_RETRY_CODE.CONFIRM}나 ${LOTTO_RETRY_CODE.REJECT}를 입력해주세요!`,
});

export default ERROR;
