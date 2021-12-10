export const MOCK = {
  PURCHASE: 5000,
  WIN_NUMS: [9, 21, 38, 34, 24, 29],
  STATICS: [
    [1, 5000],
    [0, 50000],
    [0, 150000],
    [0, 30000000],
    [0, 2000000000],
  ],
  LOTTOS: [
    22, 26, 31, 37, 4, 42, 8, 15, 21, 31, 33, 38, 7, 9, 24, 29, 34, 38, 10, 21, 22, 30, 6, 35, 3, 9, 12, 13, 25, 43,
  ],
  MANUAL_LOTTO: [12, 24, 3, 9, 41, 42, 11, 13, 19, 45, 1, 2, 21, 2, 4, 37, 12, 18],
};
export const PRIZE =
  ((MOCK.STATICS[0][0] * MOCK.STATICS[0][1] + MOCK.STATICS[3][0] * MOCK.STATICS[3][1]) / MOCK.PURCHASE) * 100;
