export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_LENGTH = 6;

export const RANK = {
  FIFTH: 'FIFTH',
  FOURTH: 'FOURTH',
  THRID: 'THRID',
  SECOND: 'SECOND',
  FIRST: 'FIRST',
};

export const RANK_AMOUNT = {
  FIFTH: 5_000,
  FOURTH: 50_000,
  THRID: 1_500_000,
  SECOND: 30_000_000,
  FIRST: 2_000_000_000,
};

export const RANK_CONDITION = {
  [RANK.FIFTH]: {
    matchConditionCount: 3,
    isNeedBonuce: false,
  },
  [RANK.FOURTH]: {
    matchConditionCount: 4,
    isNeedBonuce: false,
  },
  [RANK.THRID]: {
    matchConditionCount: 5,
    isNeedBonuce: false,
  },
  [RANK.SECOND]: {
    matchConditionCount: 5,
    isNeedBonuce: true,
  },
  [RANK.FIRST]: {
    matchConditionCount: 6,
    isNeedBonuce: false,
  },
};
