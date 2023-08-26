import { Lotto } from "../src/js/domain/Lotto";
import { LottoRetailer } from "../src/js/domain/LottoRetailer";

describe("A lotto retailer sells lotto lottoList for money", () => {
  const retailer = new LottoRetailer();
  it.each([
    [0, 0, 0],
    [500, 0, 500],
    [1000, 1, 0],
    [1500, 1, 500],
    [10000, 10, 0],
    [100000, 100, 0],
  ])(
    "should return correct number of lotto lottoList and change",
    (money, expectedNumberOfLotto, expectedChange) => {
      const { lottoList, change } = retailer.issues(money);
      expect(lottoList.length).toEqual(expectedNumberOfLotto);
      expect(change).toEqual(expectedChange);
      lottoList.forEach((lotto) => {
        expect(lotto).toBeInstanceOf(Lotto);
      });
    }
  );
});
