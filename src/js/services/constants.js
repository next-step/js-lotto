export const AMOUNT_UNIT = 1000;

export const MAX_LOTTO_DIGIT = 6;

export const BONUS_LOTTO_DIGIT = 1;

export const MIN_WINNING_COUNT = 3;

export const MAX_LOTTO_NUMBER = 45;

export const ACCEPT_BONUS_NUMBER = 5;

export const MODAL_SELECTOR = '.modal';

export const MODAL_CONTROL_CLASS = 'open';

export const ERROR_MESSAGE = {
  REQUIRED_DIGIT: '숫자를 입력해주세요.',
  MUST_MORE_THAN: `값은 ${AMOUNT_UNIT} 이상이어야 합니다.`,
  MUST_REQUIRED_AMOUNT_UNIT: `로또 구입 금액을 ${AMOUNT_UNIT.toLocaleString(
    'ko-kr',
  )}원 단위로 입력해 주세요.`,
  REQUIRED_WINNING_NUMBER: '당첨 번호를 입력해주세요.',
  MUST_MORE_THAN_ONE: `당첨 번호는 0보다 크거나 같아야 합니다.`,
  MUST_LESS_THAN: `당첨 번호는 ${MAX_LOTTO_NUMBER}보다 낮아야 합니다.`,
  MUST_NOT_DUPLICATE: `당첨 번호는 중복 입력할 수 없어요.`,
  IMPOSSIBLE_COUNT: '입력 가능한 구매 수를 확인해주세요.',
};
