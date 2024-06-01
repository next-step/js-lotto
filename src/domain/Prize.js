export const FIRST_PRIZE = 2000000000;
export const SECOND_PRIZE = 30000000;
export const THIRD_PRIZE = 1500000;
export const FOURTH_PRIZE = 50000;
export const FIFTH_PRIZE = 5000;

export const PRIZE = {
  FIRST: {
    rank: "FIRST",
    matchCount: 6,
    prize: FIRST_PRIZE,
    containBonus: false,
  },
  SECOND: {
    rank: "SECOND",
    matchCount: 5,
    prize: SECOND_PRIZE,
    containBonus: true,
  },
  THIRD: {
    rank: "THIRD",
    matchCount: 5,
    prize: THIRD_PRIZE,
    containBonus: false,
  },
  FOURTH: {
    rank: "FOURTH",
    matchCount: 4,
    prize: FOURTH_PRIZE,
    containBonus: false,
  },
  FIFTH: {
    rank: "FIFTH",
    matchCount: 3,
    prize: FIFTH_PRIZE,
    containBonus: false,
  },
  NONE: { rank: "NONE", matchCount: 0, prize: 0, containBonus: false },
};

class Prize {
  #rank = [PRIZE.FIRST, PRIZE.SECOND, PRIZE.THIRD, PRIZE.FOURTH, PRIZE.FIFTH];

  constructor() {}

  findRank(matchCount, bonusNumber) {
    const result = this.#rank.find((rank) => {
      if (matchCount === PRIZE.SECOND.matchCount) {
        return (
          rank.containBonus === bonusNumber && matchCount === rank.matchCount
        );
      } else {
        return rank.matchCount === matchCount;
      }
    });

    if (result === undefined) return PRIZE.NONE;

    return result;
  }
}
export default Prize;
