import {
  isValidNumberInRange,
  isValidNumberArray,
  isValueInArray,
  isValidPurchaseAmount,
} from "../src/validation.js";

describe("Validation Functions", () => {
  const range = { min: 1, max: 45 };

  describe("isValidNumberInRange", () => {
    test("should return true for the minimum boundary value", () => {
      expect(isValidNumberInRange(1, range)).toBe(true);
    });

    test("should return true for the maximum boundary value", () => {
      expect(isValidNumberInRange(45, range)).toBe(true);
    });

    test("should return false for a value below the minimum boundary", () => {
      expect(isValidNumberInRange(0, range)).toBe(false);
    });

    test("should return false for a value above the maximum boundary", () => {
      expect(isValidNumberInRange(46, range)).toBe(false);
    });

    test("should return false for non-integer values", () => {
      expect(isValidNumberInRange(10.5, range)).toBe(false);
    });
  });

  describe("isValidNumberArray", () => {
    test("should return true for an array with valid boundary values", () => {
      expect(isValidNumberArray([1, 45], range)).toBe(true);
    });

    test("should return false if any number is below the minimum boundary", () => {
      expect(isValidNumberArray([0, 10, 20], range)).toBe(false);
    });

    test("should return false if any number is above the maximum boundary", () => {
      expect(isValidNumberArray([5, 10, 46], range)).toBe(false);
    });

    test("should return false for a non-array input", () => {
      expect(isValidNumberArray("not an array", range)).toBe(false);
    });
  });

  describe("isValueInArray", () => {
    test("should return true if the bonus number is in the winning numbers", () => {
      expect(isValueInArray([1, 2, 3, 4, 5], 3)).toBe(true);
    });

    test("should return false if the bonus number is not in the winning numbers", () => {
      expect(isValueInArray([1, 2, 3, 4, 5], 6)).toBe(false);
    });
  });

  describe("isValidPurchaseAmount", () => {
    const unit = 1000;

    test("should return true for a valid purchase amount equal to the unit", () => {
      expect(isValidPurchaseAmount(1000, unit)).toBe(true);
    });

    test("should return false for an amount not a multiple of the unit", () => {
      expect(isValidPurchaseAmount(1500, unit)).toBe(false);
    });
  });
});
