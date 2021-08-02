export const VALUE = {
  LOTTO_MIN_PRICE: 1000,
  LOTTO_MAX_PRICE: 100000,
  LOTTO_COUNT: 6,
  LOTTO_BONUS_COUNT: 1,
  LOTTO_ALL_NUMBER_COUNT: 7,
  LOTTO_UNIT: 1000,
  LOTTO_MIN_NUM: 1,
  LOTTO_MAX_NUM: 45,
  WINNER_COUNT: 5,
  COUNT: {
    MATCH_COUNT_THREE_IDX: 0,
    MATCH_COUNT_FOUR_IDX: 1,
    MATCH_COUNT_FIVE_IDX: 2,
    MATCH_COUNT_SIX_IDX: 4,
    BONUS_IDX: 3,
  },
};

export const ERR_MESSAGE = {
  LOTTO: {
    INVAILD_PRICE_RANGE: `${VALUE.LOTTO_MIN_PRICE} ~ ${VALUE.LOTTO_MAX_PRICE} 사이의 값만 입력 가능합니다.`,
    INVAILD_PRICE_UNITS: `로또는 ${VALUE.LOTTO_UNIT}원 단위로 구매할 수 있습니다.`,
  },
  WINNER_NUMBER: {
    INVAILD_NUMS: `${VALUE.LOTTO_MIN_NUM} ~ ${VALUE.LOTTO_MAX_NUM} 사이의 값만 입력 가능합니다.`,
    DUPLICATE_NUMS: `로또 번호에는 중복된 숫자를 입력할 수 없습니다.`,
  },
};

export const LOTTO_PRICES = [
  {
    matchNumberCount: 3,
    price: 5000,
  },
  {
    matchNumberCount: 4,
    price: 50000,
  },
  {
    matchNumberCount: 5,
    price: 1500000,
  },
  {
    matchNumberCount: 5,
    price: 30000000,
  },
  {
    matchNumberCount: 6,
    price: 2000000000,
  },
];

export const TEST = {
  LOW_PRICE: 10,
  HIGH_PRICE: 9999999,
  PROPER_PRICE: 10000,
  INVAILD_PRICE: 1234,
  ONE_TICKET: 1000,
  AMOUNT_LOTTO: (PROPER_PRICE) => Math.floor(PROPER_PRICE / VALUE.LOTTO_UNIT),
  WINNER_NUMS: [22, 26, 31, 37, 41, 42, 24],
  DUPLICATE_WINNER_NUMS: [1, 2, 3, 1, 2, 3, 1],
};
