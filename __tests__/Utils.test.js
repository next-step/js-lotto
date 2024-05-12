import generateRandomNumber from "../src/js/utils/generateRandomNumber";

describe("랜덤 숫자", () => {
  it("범위가 숫자가 아닐 경우 에러가 발생한다.", () => {
    const min = "1";
    const max = "2";

    expect(() => generateRandomNumber(min, max)).toThrow(TypeError);
  });

  it("왼쪽 범위가 오른쪽 범위보다 클 경우 에러가 발생한다.", () => {
    const min = 2;
    const max = 1;

    expect(() => generateRandomNumber(min, max)).toThrow(RangeError);
  });

  it("숫자가 범위 내에 존재한다.", () => {
    const min = 1;
    const max = 10;

    const number = generateRandomNumber(min, max);

    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });
});
