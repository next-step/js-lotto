export const LOTTO_ICON = '🎟️';
export const LOTTO_PRICE = 1000;
export const LOTTO_KEYS = {
  FIRST: 'FIRST',
  SECOND: 'SECOND',
  THIRD: 'THIRD',
  FOURTH: 'FOURTH',
  FIFTH: 'FIFTH',
};
export const LOTTO_PRIZE_CONDITION = {
  [LOTTO_KEYS.FIRST]: { hit: 6, bonus: 0 },
  [LOTTO_KEYS.SECOND]: { hit: 5, bonus: 1 },
  [LOTTO_KEYS.THIRD]: { hit: 5, bonus: 0 },
  [LOTTO_KEYS.FOURTH]: { hit: 4, bonus: 0 },
  [LOTTO_KEYS.FIFTH]: { hit: 3, bonus: 0 },
};
export const LOTTO_PRIZE_AMOUNT = {
  [LOTTO_KEYS.FIRST]: 2_000_000_000,
  [LOTTO_KEYS.SECOND]: 30_000_000,
  [LOTTO_KEYS.THIRD]: 1_500_000,
  [LOTTO_KEYS.FOURTH]: 50_000,
  [LOTTO_KEYS.FIFTH]: 5_000,
};
export const LOTTO_HIT_COUNT = Object.freeze(
  Object.keys(LOTTO_KEYS).reduce((result, key) => ({ ...result, [key]: 0 }), {})
);

export const canIGetAwards = (hit, bonus) => hit >= 3 || (hit === 5 && bonus === 1);
