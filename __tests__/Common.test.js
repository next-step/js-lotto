
import { InputType } from "../src/constants/lotto.js";
import { checkByType } from "../src/lib/lottoLib.js";

describe("공통 사용", () => {
  test("type별 input값이 숫자인가?", () => {

    const lottoPriceTypeCheck = checkByType(InputType.PRICE, "5000");
    const lottoWinnerNumbersTypeCheck = checkByType(
      InputType.WINNER_NUMBER,
      "1,2,3,4,5,6"
    );
    const lottoBonusWinnerNumberTypeCheck = checkByType(
      InputType.BONUS_NUMBER,
      "7"
    );

    expect(lottoPriceTypeCheck).toBe(true);
    expect(lottoWinnerNumbersTypeCheck).toBe(true);
    expect(lottoBonusWinnerNumberTypeCheck).toBe(true);
  });
});
