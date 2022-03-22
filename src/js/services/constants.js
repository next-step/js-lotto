export const AMOUNT_UNIT = 1000;

export const ERROR_MESSAGE = {
  REQUIRED_DIGIT: '숫자를 입력해주세요.',
  MUST_MORE_THAN: `값은 ${AMOUNT_UNIT} 이상이어야 합니다.`,
  MUST_REQUIRED_AMOUNT_UNIT: `로또 구입 금액을 ${AMOUNT_UNIT.toLocaleString(
    'ko-kr',
  )}원 단위로 입력해 주세요.`,
};
