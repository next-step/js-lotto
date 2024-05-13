import { validateNumbers } from "../lotto/lotto.contract.js";

import {
  LOTTO_GAME_MATCHED_COUNT,
  LOTTO_GAME_PRIZE,
  LOTTO_GAME_RANK,
} from "./lotto-game.constant.js";
import { validateBonusNumber } from "./lotto-game.contract.js";

class LottoGame {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    validateNumbers(winningNumbers);
    validateBonusNumber(bonusNumber);

    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
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

      case LOTTO_GAME_MATCHED_COUNT.SECOND_AND_THIRD:
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
    return LOTTO_GAME_PRIZE[rank];
  }
}

export default LottoGame;
