import LOTTO from "../lotto/lotto.constant.js";

import { LOTTO_GAME_RANK } from "./lotto-game.constant.js";

export function validateBonusNumber(bonusNumber, winningNumbers) {
  if (
    typeof bonusNumber !== "number" ||
    isNaN(bonusNumber) ||
    !Number.isInteger(bonusNumber)
  ) {
    throw new TypeError("보너스 번호는 Integer 타입이어야 합니다.");
  }

  if (bonusNumber < LOTTO.MIN_NUMBER || bonusNumber > LOTTO.MAX_NUMBER) {
    throw new RangeError(
      `보너스 번호는 ${LOTTO.MIN_NUMBER}과 ${LOTTO.MAX_NUMBER} 사이의 숫자여야 합니다.`,
    );
  }

  if (winningNumbers && winningNumbers.includes(bonusNumber)) {
    throw new RangeError("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
  }
}

export function validateRank(rank) {
  if (typeof rank !== "number" || isNaN(rank)) {
    throw new TypeError("순위는 number 타입이어야 합니다.");
  }

  if (Object.values(LOTTO_GAME_RANK).every((value) => value !== rank)) {
    throw new RangeError(
      `순위는 ${LOTTO_GAME_RANK.FIRST}과 ${LOTTO_GAME_RANK.NONE} 사이의 숫자여야 합니다.`,
    );
  }
}
