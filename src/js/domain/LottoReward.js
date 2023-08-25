export const RANK_KEY = Object.freeze({
  FIRST: Symbol('first'),
  SECOND: Symbol('second'),
  THIRD: Symbol('third'),
  FOURTH: Symbol('fourth'),
  FIFTH: Symbol('fifth'),
});

export class LottoReward {
  static FIRST = new LottoReward({
    key: RANK_KEY.FIRST,
    match: 6,
    prize: 2_000_000_000,
    hasBonus: false,
  });

  static SECOND = new LottoReward({
    key: RANK_KEY.SECOND,
    match: 5,
    prize: 30_000_000,
    hasBonus: true,
  });

  static THIRD = new LottoReward({
    key: RANK_KEY.THIRD,
    match: 5,
    prize: 1_500_000,
    hasBonus: false,
  });

  static FOURTH = new LottoReward({
    key: RANK_KEY.FOURTH,
    match: 4,
    prize: 50_000,
    hasBonus: false,
  });

  static FIFTH = new LottoReward({
    key: RANK_KEY.FIFTH,
    match: 3,
    prize: 5_000,
    hasBonus: false,
  });

  #key;

  #match;

  #prize;

  #hasBonus;

  constructor({ key, match, prize, hasBonus }) {
    this.#key = key;
    this.#match = match;
    this.#prize = prize;
    this.#hasBonus = hasBonus;
  }

  get key() {
    return this.#key;
  }

  get match() {
    return this.#match;
  }

  get prize() {
    return this.#prize;
  }

  get hasBonus() {
    return this.#hasBonus;
  }

  static getLottoReward(lotto, winningLotto) {
    const matchedCount = winningLotto.getMatchedCount(lotto);
    const hasBonus = winningLotto.hasBonus(lotto);
    if (matchedCount === LottoReward.THIRD.match && !hasBonus) {
      return LottoReward.THIRD;
    }
    return Object.values(LottoReward).find(({ match }) => match === matchedCount);
  }
}
