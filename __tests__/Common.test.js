import {
  LOTTO_BONUS_WINNER_NUMBER_TYPE,
  LOTTO_PRICE_TYPE,
  LOTTO_WINNER_NUMBERS_TYPE,
} from "../src/constants/lotto.js";
import { checkByType } from "../src/lib/lottoLib.js";

describe("공통 사용", () => {
  test("type별 input값이 숫자인가?", () => {
    const lottoPriceTypeCheck = checkByType(LOTTO_PRICE_TYPE, "5000");
    const lottoWinnerNumbersTypeCheck = checkByType(
      LOTTO_WINNER_NUMBERS_TYPE,
      "1,2,3,4,5,6"
    );
    const lottoBonusWinnerNumberTypeCheck = checkByType(
      LOTTO_BONUS_WINNER_NUMBER_TYPE,
      "7"
    );

    expect(lottoPriceTypeCheck).toBe(true);
    expect(lottoWinnerNumbersTypeCheck).toBe(true);
    expect(lottoBonusWinnerNumberTypeCheck).toBe(true);
  });
});
