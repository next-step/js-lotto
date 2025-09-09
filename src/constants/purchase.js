export const LINE_MINIMUM_NUMBER = 1;
export const LINE_MAXIMUM_NUMBER = 45;
export const LINE_SIZE = 6;
export const LINE_PRICE = 1_000;

export const PURCHASE_ERROR_MESSAGE = {
  MINIMUM_AMOUNT_PAID: `'로또는 ${LINE_PRICE.toLocaleString()}원 이상부터 구매 가능합니다.'`,
  RANGE: `${LINE_MINIMUM_NUMBER}~${LINE_MAXIMUM_NUMBER} 사이의 숫자만 입력 가능합니다.`,
  WINNING_DUPLICATION: '중복되는 숫자는 입력할 수 없습니다.',
  WINNING_SIZE: `숫자를 ${LINE_SIZE}개 입력해주세요.`,
  BONUS_EMPTY: '보너스 숫자를 입력해주세요.',
  BONUS_DUPLICATION: '당첨 번호와 중복되지 않게 입력해주세요.',
};
