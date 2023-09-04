import {
  LOTTO_NUMBER_SEPARATOR,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_PRICE,
  LOTTO_NUMBER_LENGTH,
  APP_EXIT_KEY,
  APP_RETRY_KEY
} from './configure';

export const ERROR_MARKER = '[⛔️ERROR]';

export const ALERT_MESSAGE = Object.freeze({
  QUESTION_PURCHASE_AMOUNT: '구입 금액을 입력해주세요.',
  QUESTION_LOTTO_NUMBER: '당첨 번호를 입력해주세요.',
  QUESTION_BONUS_NUMBER: '보너스 번호를 입력해주세요.',
  STATISTICS_TITLE_MESSAGE: '당첨 통계',
  RETRY_MESSAGE: `다시 시작하시겠습니까? (${APP_RETRY_KEY}/${APP_EXIT_KEY})`
});

export const ERROR_MESSAGE = Object.freeze({
  ERROR_CODE: '로또 구입 금액을 입력해주세요.',
  NOT_RECEIVED_LOTTO_NUMBER: '로또 번호를 입력해주세요.',
  NOT_RECEIVED_BONUS_NUMBER: '보너스 번호를 입력해주세요.',
  NOT_ENOUGH_AMOUNT: `최소 로또 구입 금액이 부족합니다. 최소 금액은 ${LOTTO_PRICE}원입니다.`,
  INVALID_APP_RETRY_KEY: `다시 시작하려면 ${APP_RETRY_KEY}를 입력해주시고, 종료하려면 ${APP_EXIT_KEY}를 입력해주세요.`,
  INVALID_LOTTO_MODE: '올바른 로또 방식이 아닙니다.',
  INVALID_LOTTO_NUMBER_BY_NOT_EXIST: '로또 번호가 존재하지 않습니다.',
  INVALID_AMOUNT_BY_NOT_POSITIVE_AMOUNT: '로또 구입 금액은 양의 정수만 입력 가능합니다.',
  INVALID_LOTTO_NUMBER_BY_SEPARATOR: `로또 번호는 '${LOTTO_NUMBER_SEPARATOR}'를 기준으로 입력해주세요.`,
  INVALID_LOTTO_NUMBER_BY_RANGE: `로또 번호는 ${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 사이의 숫자만 입력 가능합니다.`,
  INVALID_LOTTO_NUMBER_BY_DUPLICATE: '로또 번호는 중복되지 않아야 합니다.',
  INVALID_LOTTO_NUMBER_BY_NOT_ENOUGH_LENGTH: '로또 번호는 6개의 숫자로 이루어져야 합니다.',
  INVALID_LOTTO_NUMBER_BY_NOT_POSITIVE_NUMBER: '로또 번호는 양수만 입력 가능합니다.',
  INVALID_BONUS_NUMBER_BY_RANGE: `보너스 번호는 ${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 사이의 숫자만 입력 가능합니다.`,
  INVALID_BONUS_NUMBER_BY_DUPLICATE: '보너스 번호는 당첨 번호와 중복되지 않아야합니다.',
  INVALID_WINNING_LOTTO_NUMBER: `로또 당첨 번호는 ${LOTTO_NUMBER_LENGTH}개의 숫자로 이루어져야 합니다.`,
  INVALID_WINNING_LOTTO_NUMBER_BY_DUPLICATE: '로또 당첨 번호는 중복되지 않는 숫자로 이루어져야 합니다.',
  INVALID_WINNING_LOTTO_NUMBER_BY_RANGE: `로또 당첨 번호는 ${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 사이의 숫자로만 이루어져야 합니다.`
});
