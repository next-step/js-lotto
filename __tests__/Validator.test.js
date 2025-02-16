import Validator from "../src/domain/Validator";
import { ERROR_MESSAGES } from "../src/utils/constants";

describe("입력값 검증 테스트", () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  it("숫자를 입력하면 true를 반환합니다.", () => {
    const input = "1";

    expect(validator.isValidNumber(input)).toBeTruthy();
  });

  it("정수를 입력하면 true를 반환합니다.", () => {
    const input = 1000;

    expect(validator.isValidNumber(input)).toBeTruthy();
  });

  it("기본 단위 이상을 입력하면 true를 반환합니다.", () => {
    const input = 2000;

    expect(validator.isAboveMinimum(input)).toBeTruthy();
  });

  it("string을 입력하면 false를 반환합니다.", () => {
    const input = "천원";

    expect(validator.isValidNumber(input)).toBeFalsy();
  });

  it("유리수를 입력하면 false를 반환합니다.", () => {
    const input = 1000.1;

    expect(validator.isValidNumber(input)).toBeFalsy();
  });

  it("기본 단위 이하를 입력하면 false를 반환합니다.", () => {
    const input = 900;

    expect(validator.isAboveMinimum(input)).toBeFalsy();
  });

  describe("로또 추첨 번호 테스트", () => {
    it("유효한 로또 번호를 입력하면 true를 반환합니다.", () => {
      const input = ["1", "2", "3", "4", "5", "6", "7"];

      expect(validator.validateWinningNumbers(input)).toBeTruthy();
    });

    it("최대값인 45를 포함한 유효한 로또 번호를 입력하면 true를 반환합니다.", () => {
      const input = ["1", "2", "3", "4", "5", "45", "7"];

      expect(validator.validateWinningNumbers(input)).toBeTruthy();
    });

    it("최대값인 46을 포함하면 에러를 발생시킵니다.", () => {
      const input = ["1", "2", "3", "4", "5", "46", "7"];

      expect(() => validator.validateWinningNumbers(input)).toThrow(
        ERROR_MESSAGES.MUST_BE_IN_RANGE
      );
    });

    it("최소값인 0을 포함하면 에러를 발생시킵니다.", () => {
      const input = ["0", "2", "3", "4", "5", "6", "7"];

      expect(() => validator.validateWinningNumbers(input)).toThrow(
        ERROR_MESSAGES.MUST_BE_IN_RANGE
      );
    });

    it("중복된 로또 번호를 입력하면 에러를 발생시킵니다.", () => {
      const input = ["1", "2", "3", "4", "5", "6", "6"];

      expect(() => validator.validateWinningNumbers(input)).toThrow(
        ERROR_MESSAGES.MUST_BE_NOT_DUPLICATE
      );
    });

    it("빈 배열을 입력하면 에러를 발생시킵니다.", () => {
      const input = [];

      expect(() => validator.validateWinningNumbers(input)).toThrow(
        ERROR_MESSAGES.MUST_BE_SEVEN_DIGITS
      );
    });

    it("숫자가 아닌 값을 포함하면 에러를 발생시킵니다.", () => {
      const input = ["1", "2", "3", "4", "5", "abc", "7"];

      expect(() => validator.validateWinningNumbers(input)).toThrow(
        ERROR_MESSAGES.MUST_BE_INTEGER
      );
    });

    it("빈 문자열을 포함하면 에러를 발생시킵니다.", () => {
      const input = ["1", "2", "3", "4", "5", "", "7"];

      expect(() => validator.validateWinningNumbers(input)).toThrow(
        ERROR_MESSAGES.MUST_BE_IN_RANGE
      );
    });
  });
});
