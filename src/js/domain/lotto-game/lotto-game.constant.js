export const LOTTO_GAME_RANK = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  NONE: 6,
};

export const LOTTO_GAME_MATCHED_COUNT = {
  FIRST: 6,
  SECOND: 5,
  THIRD: 5,
  FOURTH: 4,
  FIFTH: 3,
};

export const LOTTO_GAME_PRIZE = {
  [LOTTO_GAME_RANK.FIRST]: 2_000_000_000,
  [LOTTO_GAME_RANK.SECOND]: 30_000_000,
  [LOTTO_GAME_RANK.THIRD]: 1_500_000,
  [LOTTO_GAME_RANK.FOURTH]: 50_000,
  [LOTTO_GAME_RANK.FIFTH]: 5_000,
  [LOTTO_GAME_RANK.NONE]: 0,
};

export const LOTTO_GAME_STATISTICS = Object.values(LOTTO_GAME_RANK).reduce(
  (acc, rank) => {
    return { ...acc, [rank]: { count: 0, prize: 0 } };
  },
  {},
);
