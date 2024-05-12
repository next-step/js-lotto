import {
  validateNumberCount,
  validateNumberInRange,
  validateNaturalNumber,
  validateUniqueNumber,
} from "../src/domain/LottoValidate";

describe("LottoValidate", () => {
  describe("validateNumberCount", () => {
    test.each([[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
      "로또 번호가 %s일 때 에러를 던진다.",
      (numbers) => {
        expect(() => validateNumberCount(numbers)).toThrow(
          "로또 번호는 6개여야 합니다."
        );
      }
    );

    test.each([[[1, 2, 3, 4, 5, 6]], [[1, 2, 3, 4, 5, 7]]])(
      "로또 번호가 %s일 때 에러를 던지지 않는다.",
      (numbers) => {
        expect(() => validateNumberCount(numbers)).not.toThrow();
      }
    );
  });

  describe("validateNumberInRange", () => {
    test.each([[0], [-1], [46]])(
      "로또 번호가 %s일 때 에러를 던진다.",
      (num) => {
        expect(() => validateNumberInRange(num)).toThrow(
          `모든 로또의 번호는 1부터 45사이의 수 입니다.`
        );
      }
    );

    test.each([[1], [45], [22]])(
      "로또 번호가 %s일 때 에러를 던지지 않는다.",
      (num) => {
        expect(() => validateNumberInRange(num)).not.toThrow();
      }
    );
  });

  describe("validateNaturalNumber", () => {
    test.each([[1.3], [Infinity]])(
      "로또 번호가 %s일 때 에러를 던진다.",
      (num) => {
        expect(() => validateNaturalNumber(num)).toThrow(
          "모든 로또의 번호는 자연수여야 합니다."
        );
      }
    );

    test.each([[1], [2], [3]])(
      "로또 번호가 %s일 때 에러를 던지지 않는다.",
      (num) => {
        expect(() => validateNaturalNumber(num)).not.toThrow();
      }
    );
  });

  describe("validateUniqueNumber", () => {
    test.each([[[1, 1, 2, 3, 4, 5]], [[1, 2, 2, 3, 4, 5]]])(
      "로또 번호가 %s일 때 에러를 던진다.",
      (numbers) => {
        expect(() => validateUniqueNumber(numbers)).toThrow(
          "중복된 번호가 있습니다."
        );
      }
    );

    test.each([[[1, 2, 3, 4, 5, 6]], [[1, 2, 3, 4, 5, 7]]])(
      "로또 번호가 %s일 때 에러를 던지지 않는다.",
      (numbers) => {
        expect(() => validateUniqueNumber(numbers)).not.toThrow();
      }
    );
  });
});
