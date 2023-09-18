import { RankNotNumberError, RankOutOfRangeError } from "./errors";
import { RANKS } from "../constants";

export default class Rank {
  PRIZES = {
    [RANKS.FIRST]: 2_000_000_000,
    [RANKS.SECOND]: 30_000_000,
    [RANKS.THIRD]: 1_500_000,
    [RANKS.FOURTH]: 50_000,
    [RANKS.FIFTH]: 5_000,
    [RANKS.NONE]: 0,
  };
  RANK_LOWER_BOUND = RANKS.FIRST;
  RANK_UPPER_BOUND = RANKS.NONE;
  #prize;

  static of(rank) {
    return new Rank(rank);
  }

  constructor(rank) {
    this.#validateRank(rank);

    this.#prize = this.PRIZES[rank];
  }

  #validateRank(rank) {
    if (typeof rank !== "number") throw new RankNotNumberError();
    if (rank < this.RANK_LOWER_BOUND || rank > this.RANK_UPPER_BOUND)
      throw new RankOutOfRangeError();
  }

  getPrize() {
    return this.#prize;
  }
}
