export const lottoPrice = 1000;

export const ERROR_MESSAGES = {
  MUST_BE_INTEGER: "[ERROR] 정수를 입력해야 합니다.",
  MUST_BE_ABOVE_MINIMUM: "[ERROR] 최소금액 이상을 입력해야 합니다.",
  MUST_BE_SEVEN_DIGITS:
    "[ERROR] 당첨 숫자와 보너스 숫자는 ,로 분리되어 7자여야 합니다.",
  MUST_BE_IN_RANGE: "[ERROR] 숫자는 1과 45사이의 값이어야 합니다.",
  MUST_BE_NOT_DUPLICATE: "[ERROR] 숫자는 중복되지 않아야 합니다.",
};

export const LOTTO_NUMBER_RANGE = {
  MINIMUM: 1,
  MAXIMUM: 45,
};

export const WINNING_PLUS_BONUS = 7;

export const WINNING_PRIZES = {
  3: 5000,
  4: 50000,
  5: 1500000,
  "5Bonus": 30000000,
  6: 2000000000,
};

export const RESULT_TEXT = {
  "3": "3개 일치 (5,000원)",
  "4": "4개 일치 (50,000원)",
  "5": "5개 일치 (1,500,000원)",
  "5Bonus": "5개 일치, 보너스볼 일치 (30,000,000원)",
  "6": "6개 일치 (2,000,000,000원)",
};
