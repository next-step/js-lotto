import { LottoTicket } from "../src/js/LottoTicket";

describe("A lotto ticket", () => {
  it.each([
    [[]], // it's empty
    [[1, 2, 3, 4, 5]], // only 5 numbers
    [[1, 2, 3, 4, 5, 6, 7]], // too many numbers
    [[1, 2, 3, 4, 5, 5]], // duplicate
    [[0, 1, 2, 3, 4, 5]], // first number is too small
    [[1, 2, 3, 4, 5, 46]], // last number is too big
  ])(
    "should throw an error when invalid lotto numbers are given",
    (invalidLottoNumbers) => {
      console.log("test:", invalidLottoNumbers);
      expect(() => new LottoTicket(invalidLottoNumbers)).toThrow();
    }
  );
});
