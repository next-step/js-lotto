export const selector = (selector) => document.querySelector(selector);
export const selectorAll = (selector) => document.querySelectorAll(selector);

export const WARNING_WHEN_NOT_IN_CORRECT_RANGE =
  '로또 구입 금액은 1,000원 부터 100,000까지 입니다.';
export const WARNING_WHEN_NOT_IN_1000_UNITS =
  '로또 구입 금액을 1,000원 단위로 입력해 주세요.';
export const WARNING_WHEN_NOT_IN_ONE_FOURTYFIVE =
  '당첨 번호 범위는 1에서 45까지 입니다.';
export const WARNING_WHEN_DUPLICATE =
  '로또 번호에는 중복된 숫자를 입력할 수 없습니다.';

export const UNIT_PRICE = 1000;
export const MAXIMUM_PRICE = 100_000;

const FIRST_PRIZE = 2_000_000_000;
const SECOND_PRIZE = 30_000_000;
const THIRD_PRIZE = 1_500_000;
const FOURTH_PRIZE = 50_000;
const FIFTH_PRIZE = 5_000;
const REST_PRIZE = 0;

export const LOTTO_NUMBER = {
  MAX: 45,
  MIN: 1,
};

export const LANK = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOUTRH: 4,
  FIFTH: 5,
  REST: 6,
};

export const PRIZE = {
  1: FIRST_PRIZE,
  2: SECOND_PRIZE,
  3: THIRD_PRIZE,
  4: FOURTH_PRIZE,
  5: FIFTH_PRIZE,
  6: REST_PRIZE,
};

export const PROFIT_RATE_MESSAGE = (text) =>
  `당신의 총 수익률은 ${text}% 입니다.`;
