import { go, map } from "../../utils/fx.js";
import validation from "../../utils/validation.js";

import LOTTO from "./lotto.constant.js";

export const validateNumbers = (numbers) =>
  go(
    numbers,
    validation.isArrayOfSize(LOTTO.COUNT_OF_NUMBERS),
    validation.isUniqueArray,
    map(validation.isInteger),
    map(validation.isInRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER)),
  );
