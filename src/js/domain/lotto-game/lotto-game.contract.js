import LOTTO from "../lotto/lotto.constant";

import { LOTTO_GAME_RANK } from "./lotto-game.constant";

export function validateBonusNumber(bonusNumber) {
  if (typeof bonusNumber !== "number") {
    throw new TypeError("보너스 번호는 number 타입이어야 합니다.");
  }

  if (bonusNumber < LOTTO.MIN_NUMBER || bonusNumber > LOTTO.MAX_NUMBER) {
    throw new RangeError(
      `보너스 번호는 ${LOTTO.MIN_NUMBER}과 ${LOTTO.MAX_NUMBER} 사이의 숫자여야 합니다.`,
    );
  }

  return true;
}

export function validateRank(rank) {
  if (typeof rank !== "number") {
    throw new TypeError("순위는 number 타입이어야 합니다.");
  }

  if (LOTTO_GAME_RANK[rank] === undefined) {
    throw new RangeError(
      `순위는 ${LOTTO_GAME_RANK.FIRST}과 ${LOTTO_GAME_RANK.NONE} 사이의 숫자여야 합니다.`,
    );
  }

  return true;
}
