export const JACKPOT_RANKS = {
  FIRST: { label: '1등', value: 'FIRST', number: 1 },
  SECOND: { label: '2등', value: 'SECOND', number: 2 },
  THIRD: { label: '3등', value: 'THIRD', number: 3 },
  FOURTH: { label: '4등', value: 'FOURTH', number: 4 },
  FIFTH: { label: '5등', value: 'FIFTH', number: 5 },
};

const JACKPOT_RULES = {
  [JACKPOT_RANKS.FIRST.value]: { match: [6, 0], price: 2_000_000_000 },
  [JACKPOT_RANKS.SECOND.value]: { match: [5, 1], price: 30_000_000 },
  [JACKPOT_RANKS.THIRD.value]: { match: [5, 0], price: 1_500_000 },
  [JACKPOT_RANKS.FOURTH.value]: { match: [4, 0], price: 50_000 },
  [JACKPOT_RANKS.FIFTH.value]: { match: [3, 0], price: 5000 },
};

export const JACKPOT = {
  MIN_MATCH: JACKPOT_RULES.FIFTH.match[0],

  RANKS: JACKPOT_RANKS,
  RULES: JACKPOT_RULES,
};
