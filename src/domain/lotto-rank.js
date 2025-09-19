/**
 * @property {number} match
 * @property {boolean} hasBonus
 * @property {number} prize
 */
export const LOTTO_RANK = Object.freeze({
  FIRST: { match: 6, hasBonus: false, prize: 2_000_000_000 },
  SECOND: { match: 5, hasBonus: true, prize: 30_000_000 },
  THIRD: { match: 5, hasBonus: false, prize: 1_500_000 },
  FOURTH: { match: 4, hasBonus: false, prize: 50_000 },
  FIFTH: { match: 3, hasBonus: false, prize: 5_000 },
  LAST: { match: 0, hasBonus: false, prize: 0 },
});

const RANK_ORDER = Object.freeze([
  LOTTO_RANK.FIFTH,
  LOTTO_RANK.FOURTH,
  LOTTO_RANK.THIRD,
  LOTTO_RANK.SECOND,
  LOTTO_RANK.FIRST,
]);

/**
 *
 * @param {number} match
 * @param {boolean} hasBonus
 */
export function findLottoRank(match, hasBonus) {
  return (
    Object.values(LOTTO_RANK).find(
      (rank) => rank.match === match && rank.hasBonus === hasBonus
    ) || LOTTO_RANK.LAST
  );
}

/**
 * @param {LOTTO_RANK[]} rankList
 * @param {LOTTO_RANK} target
 * @returns {number}
 */
export function findLottoRankCount(rankList, target) {
  return rankList.filter(
    (rank) => rank.match === target.match && rank.hasBonus === target.hasBonus
  ).length;
}

/**
 *
 * @param {LOTTO_RANK[]} rankList
 * @returns {{rank: LOTTO_RANK, count: number}[]}
 */
export function summarizeRank(rankList) {
  return RANK_ORDER.map((rank) => ({
    rank,
    count: findLottoRankCount(rankList, rank),
  }));
}
