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

  describe("countMatchingNumber", () => {
    let lottoResult;

    beforeEach(() => {
      lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);
    });

    it("should return the correct count of matching numbers", () => {
      expect(lottoResult.countMatchingNumber([1, 2, 3, 4, 5, 6])).toBe(6);
      expect(lottoResult.countMatchingNumber([1, 2, 3, 7, 8, 9])).toBe(3);
    });

    it("should return 0 if there are no matching numbers", () => {
      const thicketNumbers = [7, 8, 9, 10, 11, 12];
      expect(lottoResult.countMatchingNumber(thicketNumbers)).toBe(0);
    });
  });

  describe("calculateRank", () => {
    let lottoResult;

    beforeEach(() => {
      lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);
    });

    it("should return rank 1 and prize '20억 원' for 6 matching numbers", () => {
      const ticket = [1, 2, 3, 4, 5, 6];
      expect(lottoResult.calculateRank(ticket)).toEqual({
        rank: 1,
      });
    });

    it("should return rank 2 and prize '3천만 원' for 5 matching numbers and bonus number", () => {
      const ticket = [1, 2, 3, 4, 5, 7];
      expect(lottoResult.calculateRank(ticket)).toEqual({
        rank: 2,
      });
    });

    it("should return rank 3 and prize '150만 원' for 5 matching numbers", () => {
      const ticket = [1, 2, 3, 4, 5, 8];
      expect(lottoResult.calculateRank(ticket)).toEqual({
        rank: 3,
      });
    });

    it("should return rank 4 and prize '5만 원' for 4 matching numbers", () => {
      const ticket = [1, 2, 3, 4, 8, 9];
      expect(lottoResult.calculateRank(ticket)).toEqual({
        rank: 4,
      });
    });

    it("should return rank 5 and prize '5천 원' for 3 matching numbers", () => {
      const ticket = [1, 2, 3, 8, 9, 10];
      expect(lottoResult.calculateRank(ticket)).toEqual({
        rank: 5,
      });
    });

    it("should return rank 0 and prize '꽝' for less than 3 matching numbers", () => {
      const ticket = [1, 2, 7, 8, 9, 10];
      expect(lottoResult.calculateRank(ticket)).toEqual({
        rank: 0,
      });
    });
  });
});
