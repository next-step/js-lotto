export const LOTTO_LENGTH = 6;

export const MAXIMUM_LOTTO_NUMBER = 45;

export const MINIMUM_LOTTO_NUMBER = 1;

export const LOTTO_PRIZE = {
  FAIL: { text: null, if: null, rank: "FAIL", prize: null },
  FIFTH: { text: "3개 일치", if: 3, rank: "FIFTH", prize: 5_000 },
  FOURTH: { text: "4개 일치", if: 4, rank: "FOURTH", prize: 50_000 },
  THIRD: { text: "5개 일치", if: 5, rank: "THIRD", prize: 1_500_000 },
  SECOND: { text: "5개 일치, 보너스 볼 일치", if: 5, rank: "SECOND", prize: 30_000_000 },
  FIRST: { text: "6개 일치", if: 6, rank: "FIRST", prize: 2_000_000_000 },
};
