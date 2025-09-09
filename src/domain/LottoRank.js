export class LottoRank {
  #rankName;

  #prize;

  #matchCount;

  constructor(rankName, prize, matchCount) {
    this.#rankName = rankName;
    this.#prize = prize;
    this.#matchCount = matchCount;
  }

  static of(rankName, prize, matchCount) {
    return new LottoRank(rankName, prize, matchCount);
  }

  get value() {
    return {
      rankName: this.#rankName,
      prize: this.#prize,
      matchCount: this.#matchCount,
    };
  }
}
