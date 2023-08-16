import {
  LOTTO_AMOUNT_SEPARATOR,
  LOTTO_AMOUNT_UNIT,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_NUMBER_COUNT,
} from './lotto.const.js';

export const ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE = `잘못된 입력 값입니다. ${LOTTO_AMOUNT_UNIT} 단위의 숫자로 다시 입력해주세요!`;

export const ERROR_WRONG_LOTTO_ANSWER_MESSAGE = `잘못된 입력 값입니다. ${LOTTO_AMOUNT_SEPARATOR}를 구분자로 총 ${LOTTO_NUMBER_COUNT}개의 로또 당첨 번호를 다시 입력해주세요!`;

export const ERROR_WRONG_LOTTO_BONUS_MESSAGE = `잘못된 입력 값입니다. 앞서 ${LOTTO_NUMBER_COUNT}개의 로또 당첨 번호에 없는 ${LOTTO_MIN_NUMBER}~${LOTTO_MAX_NUMBER} 사이의 숫자를 다시 입력해주세요!`;
