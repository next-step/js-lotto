export const LOTTO_PRIZE_BOARD = Object.freeze({
  3: 5_000,
  4: 5_0000,
  5: { withBonus: 30_000_000, withoutBonus: 1_500_000 },
  6: 2_000_000_000,
});

export const LOTTO_INITIAL_PRIZE_COUNT = {
  3: 0,
  4: 0,
  5: { withBonus: 0, withoutBonus: 0 },
  6: 0,
};

export const RESTART_INPUT = Object.freeze({
  YES: 'y',
  NO: 'n',
});
