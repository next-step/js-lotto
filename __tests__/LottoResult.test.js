import { ERROR_MESSAGES } from "../src/constants.js";
import { LottoResult } from "../src/domain/models/LottoResult";

describe("LottoResult", () => {
  describe("Number validation", () => {
    it("should throw an error if winning numbers contain non-positive integers", () => {
      expect(() => new LottoResult([1, 2, 3, -4, 5, 6], 7)).toThrow(
        ERROR_MESSAGES.WINNING_NUMBERS_INVALID,
      );
    });

    it("should throw an error if winning numbers are not exactly 6 numbers", () => {
      expect(() => new LottoResult([1, 2, 3, 4, 5], 6)).toThrow(
        ERROR_MESSAGES.WINNING_NUMBERS_LENGTH,
      );
    });

    it("should throw an error if winning numbers contain duplicates", () => {
      expect(() => new LottoResult([1, 2, 2, 4, 5, 6], 7)).toThrow(
        ERROR_MESSAGES.WINNING_NUMBERS_DUPLICATE,
      );
    });

    it("should throw an error if bonus number is not a positive integer", () => {
      expect(() => new LottoResult([1, 2, 3, 4, 5, 6], -1)).toThrow(
        ERROR_MESSAGES.BONUS_NUMBER_INVALID,
      );
    });

    it("should throw an error if bonus number is duplicated in winning numbers", () => {
      expect(() => new LottoResult([1, 2, 3, 4, 5, 6], 1)).toThrow(
        ERROR_MESSAGES.BONUS_NUMBER_DUPLICATE,
      );
    });

    it("should create a valid LottoResult when all values are correct", () => {
      const result = new LottoResult([1, 2, 3, 4, 5, 6], 7);
      expect(result).toBeInstanceOf(LottoResult);
      expect(result.winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
      expect(result.bonusNumber).toBe(7);
    });
  });
});
