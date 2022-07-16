export const LOTTO_UNIT_PRICE = 1_000;

export const LOTTO_NUMBER_TYPE = {
  WINNING: 'winning',
  BONUS: 'bonus',
};

export const RANK = {
  FIRST: {
    KEY: '1',
    PRIZE_MONEY: 2_000_000_000,
    EQUAL_COUNT_TEXT: '6개',
  },
  SECOND: {
    KEY: '2',
    PRIZE_MONEY: 30_000_000,
    EQUAL_COUNT_TEXT: '5개 + 보너스볼',
  },
  THIRD: {
    KEY: '3',
    PRIZE_MONEY: 1_500_000,
    EQUAL_COUNT_TEXT: '5개',
  },
  FOURTH: {
    KEY: '4',
    PRIZE_MONEY: 50_000,
    EQUAL_COUNT_TEXT: '4개',
  },
  FIFTH: {
    KEY: '5',
    PRIZE_MONEY: 5_000,
    EQUAL_COUNT_TEXT: '3개',
  },
  OUT: {
    KEY: '00',
    PRIZE_MONEY: 0,
    EQUAL_COUNT_TEXT: '',
  },
};
