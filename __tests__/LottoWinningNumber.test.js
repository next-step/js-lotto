import { MIN_WINNING_NUMBER, MAX_WINNING_NUMBER } from "../src/js/constants";
import { LottoWinningNumber } from "../src/js/domain/LottoWinningNumber";

const VALID_WINNING_NUMBER = [1, 2, 3, 4, 5, 6];

describe("Lotto winning numbers", () => {
  it.each([
    [[]], // it's empty
    [[1, 2, 3, 4, 5]], // only 5 numbers
    [[1, 2, 3, 4, 5, 6, 7]], // too many numbers
    [[1, 2, 3, 4, 5, 5]], // duplicate
    [[1, 2, 3, 4, 5, MIN_WINNING_NUMBER - 1]], // first number is too small
    [[1, 2, 3, 4, 5, MAX_WINNING_NUMBER + 1]], // last number is too big
  ])(
    "should throw an error when invalid winning numbers are given",
    (winningNumbers) => {
      expect(() => new LottoWinningNumber(winningNumbers, 45)).toThrow();
    }
  );

  it.each([
    [MIN_WINNING_NUMBER - 1], // too small
    [MAX_WINNING_NUMBER + 1], // too big
  ])(
    "should throw an error when an invalid bonus number is given",
    (bonusNumber) => {
      expect(
        () => new LottoWinningNumber(VALID_WINNING_NUMBER, bonusNumber)
      ).toThrow();
    }
  );

  it("should throw an error when a bonus number is duplicated in winning numbers", () => {
    expect(
      () =>
        new LottoWinningNumber(VALID_WINNING_NUMBER, VALID_WINNING_NUMBER[0])
    ).toThrow();
  });
});
