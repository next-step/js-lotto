import { LOTTO_PRIZE_MAP } from "../src/js/constants";
import { Lotto } from "../src/js/domain/Lotto";
import { LottoWinningNumber } from "../src/js/domain/LottoWinningNumber";

describe("A lotto", () => {
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
      expect(() => new Lotto(invalidLottoNumbers)).toThrow();
    }
  );

  it.each([
    [[1, 2, 3, 4, 5, 6], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 7), 1],
    [[1, 2, 3, 4, 5, 6], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 43), 1],
    [[1, 2, 3, 4, 5, 7], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 7), 2],
    [[1, 2, 3, 4, 5, 43], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 43), 2],
    [[1, 2, 3, 4, 5, 43], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 7), 3],
    [[1, 2, 3, 4, 5, 7], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 43), 3],
    [[1, 2, 3, 4, 42, 43], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 7), 4],
    [[1, 2, 3, 4, 42, 7], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 7), 4],
    [[1, 2, 3, 41, 42, 43], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 7), 5],
    [[1, 2, 3, 41, 42, 7], new LottoWinningNumber([1, 2, 3, 4, 5, 6], 7), 5],
    [
      [31, 32, 33, 34, 35, 36],
      new LottoWinningNumber([1, 2, 3, 4, 5, 6], 7),
      0,
    ],
  ])(
    "should return a correct place and prize",
    (lottoNumbers, winningNumber, expectedPlace) => {
      const lotto = new Lotto(lottoNumbers);
      lotto.check(winningNumber);
      expect(lotto.place).toEqual(expectedPlace);
      expect(lotto.prize).toEqual(LOTTO_PRIZE_MAP[lotto.place]);
    }
  );
});
