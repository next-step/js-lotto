/**
 * @typedef {Object} LottoRank
 * @property {number} match
 * @property {boolean} hasBonus
 * @property {number} prize
 */
export const LottoRank = Object.freeze({
  FIRST: { match: 6, hasBonus: false, prize: 2_000_000_000 },
  SECOND: { match: 5, hasBonus: true, prize: 30_000_000 },
  THIRD: { match: 5, hasBonus: false, prize: 1_500_000 },
  FOURTH: { match: 4, hasBonus: false, prize: 50_000 },
  FIFTH: { match: 3, hasBonus: false, prize: 5_000 },
  LAST: { match: 0, hasBonus: false, prize: 0 },
});

/**
 *
 * @param {number} match
 * @param {boolean} hasBonus
 * @returns {LottoRank}
 */
export function findLottoRank(match, hasBonus) {
  return (
    Object.values(LottoRank).find(
      (rank) => rank.match === match && rank.hasBonus === hasBonus
    ) || LottoRank.LAST
  );
}
