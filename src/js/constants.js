export const ERROR_MESSAGE = {
  INVALID: '1,000원 단위로 입력하세요.',
  REQUIRED: '금액을 입력하세요.',
  EMPTY_RANGE: '1에서 45 사이의 당첨 번호를 입력하세요.',
  DUPLICATED: '당첨 번호와 보너스 번호 모두 중복 입력은 불가합니다.',
};

export const winningForm = {
  fifth: { number: `3개`, winnings: 5_000 },
  fourth: { number: `4개`, winnings: 50_000 },
  third: { number: `5개`, winnings: 1_500_000 },
  second: { number: `5개 + 보너스볼`, winnings: 30_000_000 },
  first: { number: `6개`, winnings: 2_000_000_000 },
};

export const AMOUNT_UNIT = 1_000;
export const PERCENTAGE_UNIT = 100;
