export const FIRST_PRIZE = 2000000000;
export const SECOND_PRIZE = 30000000;
export const THIRD_PRIZE = 1500000;
export const FOURTH_PRIZE = 50000;
export const FIFTH_PRIZE = 5000;

export const PRIZE = {
  FIRST: { rank: "FIRST", matchCount: 6, prize: FIRST_PRIZE, isBonus: false },
  SECOND: {
    rank: "SECOND",
    matchCount: 5,
    prize: SECOND_PRIZE,
    isBonus: true,
  },
  THIRD: { rank: "THIRD", matchCount: 5, prize: THIRD_PRIZE, isBonus: false },
  FOURTH: {
    rank: "FOURTH",
    matchCount: 4,
    prize: FOURTH_PRIZE,
    isBonus: false,
  },
  FIFTH: { rank: "FIFTH", matchCount: 3, prize: FIFTH_PRIZE, isBonus: false },
  NONE: { rank: "NONE", matchCount: 0, prize: 0, isBonus: false },
};

class Prize {
  #rank = [PRIZE.FIRST, PRIZE.SECOND, PRIZE.THIRD, PRIZE.FOURTH, PRIZE.FIFTH];

  constructor() {}

  findRank(matchCount, isBonus) {
    const result = this.#rank.find((rank) => {
      if (matchCount === PRIZE.SECOND.matchCount) {
        return rank.isBonus === isBonus && matchCount === rank.matchCount;
      } else {
        return rank.matchCount === matchCount;
      }
    });

    if (result === undefined) return PRIZE.NONE;

    return result;
  }
}
export default Prize;
