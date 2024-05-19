import { validateNumbers } from "../lotto/lotto.contract.js";
import LOTTO_SALES from "../lotto-sales/lotto-sales.constant.js";

import {
  LOTTO_GAME_MATCHED_COUNT,
  LOTTO_GAME_PRIZE,
  LOTTO_GAME_RANK,
  LOTTO_GAME_STATISTICS,
} from "./lotto-game.constant.js";
import { validateBonusNumber, validateRank } from "./lotto-game.contract.js";

class LottoGame {
  #winningNumbers;
  #bonusNumber;
  #statistics;

  constructor(winningNumbers, bonusNumber) {
    validateNumbers(winningNumbers);
    validateBonusNumber(bonusNumber, winningNumbers);

    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
    this.#statistics = { ...LOTTO_GAME_STATISTICS };
  }

  #matchCount(numbers) {
    const matchedNumbers = numbers.filter((number) =>
      this.#winningNumbers.includes(number),
    );

    return matchedNumbers.length;
  }

  #isBonusNumberMatched(numbers) {
    return numbers.includes(this.#bonusNumber);
  }

  rank(numbers) {
    validateNumbers(numbers);

    const matchedCount = this.#matchCount(numbers);
    const isBonusNumberMatched = this.#isBonusNumberMatched(numbers);

    switch (matchedCount) {
      case LOTTO_GAME_MATCHED_COUNT.FIRST:
        return LOTTO_GAME_RANK.FIRST;

      case LOTTO_GAME_MATCHED_COUNT.SECOND:
      case LOTTO_GAME_MATCHED_COUNT.THIRD:
        return isBonusNumberMatched
          ? LOTTO_GAME_RANK.SECOND
          : LOTTO_GAME_RANK.THIRD;

      case LOTTO_GAME_MATCHED_COUNT.FOURTH:
        return LOTTO_GAME_RANK.FOURTH;

      case LOTTO_GAME_MATCHED_COUNT.FIFTH:
        return LOTTO_GAME_RANK.FIFTH;

      default:
        return LOTTO_GAME_RANK.NONE;
    }
  }

  prize(rank) {
    validateRank(rank);
    return LOTTO_GAME_PRIZE[rank];
  }

  check(lottos) {
    lottos.forEach((lotto) => {
      const rank = this.rank(lotto.numbers);
      const prize = this.prize(rank);

      this.#statistics[rank].count += 1;
      this.#statistics[rank].prize += prize;
    });
  }

  ratio() {
    const totalCount = Object.values(this.#statistics).reduce((acc, rank) => {
      return acc + rank.count;
    }, 0);
    const totalPrize = Object.values(this.#statistics).reduce((acc, rank) => {
      return acc + rank.prize;
    }, 0);

    if (totalCount === 0) {
      return 0;
    }
    return ((totalPrize / (totalCount * LOTTO_SALES.PRICE)) * 100).toFixed(1);
  }

  get statistics() {
    return { ...this.#statistics };
  }
}

export default LottoGame;
