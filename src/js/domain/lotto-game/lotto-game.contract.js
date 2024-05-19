import { curry, go } from "../../utils/fx.js";
import validation from "../../utils/validation.js";
import LOTTO from "../lotto/lotto.constant.js";

import { LOTTO_GAME_RANK } from "./lotto-game.constant.js";

export const validateBonusNumber = curry((winningNumbers, bonusNumber) =>
  go(
    bonusNumber,
    validation.isInteger,
    validation.isInRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER),
    validation.isNotIncluded(winningNumbers),
  ),
);

export const validateRank = (rank) =>
  go(
    rank,
    validation.isInteger,
    validation.isIncluded(Object.values(LOTTO_GAME_RANK)),
  );
