import RatesOfReturn from "../src/domain/RatesOfReturn.js";
import Lotto from "../src/domain/Lotto.js";

describe("TEST", () => {
  test("", () => {
    // given
    const ticketResults = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
    };

    const ratesOfReturn = new RatesOfReturn({
      purchasePrice: 8000,
      winningDetail: ticketResults,
    });

    const expectedResult = "62.5%";

    expect(expectedResult).toEqual(ratesOfReturn.getValue);
  });
});
