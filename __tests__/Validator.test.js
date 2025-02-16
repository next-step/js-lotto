import Validator from "../src/domain/Validator";

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
});
