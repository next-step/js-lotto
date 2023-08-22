import { LOTTO_NUMBER_SEPARATOR, LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER, LOTTO_PRICE } from './configure';

export const ERROR_MARKER = '[⛔️ERROR]';

export const ALERT_MESSAGE = Object.freeze({
  QUESTION_PURCHASE_AMOUNT: '구입 금액을 입력해주세요.',
  QUESTION_LOTTO_NUMBER: '당첨 번호를 입력해주세요.',
  QUESTION_BONUS_NUMBER: '보너스 번호를 입력해주세요.'
});

export const ERROR_MESSAGE = Object.freeze({
  NOT_RECEIVED_AMOUNT: '로또 구입 금액을 입력해주세요.',
  NOT_RECEIVED_LOTTO_NUMBER: '로또 번호를 입력해주세요.',
  NOT_RECEIVED_BONUS_NUMBER: '보너스 번호를 입력해주세요.',
  INVALID_AMOUNT_BY_NOT_POSITIVE_AMOUNT: '로또 구입 금액은 양의 정수만 입력 가능합니다.',
  NOT_ENOUGH_AMOUNT: `최소 로또 구입 금액이 부족합니다. 최소 금액은 ${LOTTO_PRICE}원입니다.`,
  INVALID_LOTTO_NUMBER_BY_SEPARATOR: `로또 번호는 '${LOTTO_NUMBER_SEPARATOR}'를 기준으로 입력해주세요.`,
  INVALID_LOTTO_NUMBER_BY_RANGE: `로또 번호는 ${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 사이의 숫자만 입력 가능합니다.`,
  INVALID_LOTTO_NUMBER_BY_DUPLICATE: '로또 번호는 중복되지 않게 입력해주세요.',
  INVALID_LOTTO_NUMBER_BY_NOT_POSITIVE_NUMBER: '로또 번호는 숫자만 입력 가능합니다.',
  INVALID_BONUS_NUMBER_BY_RANGE: `보너스 번호는 ${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 사이의 숫자만 입력 가능합니다.`,
  INVALID_BONUS_NUMBER_BY_DUPLICATE: '보너스 번호는 로또 번호와 중복되지 않게 입력해주세요.',
  INVALID_BONUS_NUMBER_BY_NOT_POSITIVE_NUMBER: '보너스 번호는 숫자만 입력 가능합니다.'
});
