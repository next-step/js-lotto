import {
  checkInputTypeIsNumber,
  checkCanBuyLotto,
  checkAllInputsTypeisNumber,
  checkInputsLengthValid,
  checkBounsValid,
} from "../src/getUserInput";

describe("사용자가 구입 금액을 입력했을때", () => {
  test("입력된 값이 숫자가 아니면 false이다", () => {
    expect(checkInputTypeIsNumber("ㅋㅋ")).toBe(false);
  });
  test("입력된 값이 숫자면 true이다", () => {
    expect(checkInputTypeIsNumber("123")).toBe(true);
  });
  test.each([
    ['100', false],
    ['900', false],
    ['999', false],
    ['1000', true],
  ])("입력된 값이 1000원 이상이 아니면 false를 반환한다.", (budget, expected) => {
    expect(checkCanBuyLotto(budget)).toBe(expected);
  });
});

describe("사용자가 로또 번호를 입력했을때", () => {
  test.each([
    ["1,2,3,5,6", true],
    ["1,2,3,4,5,6", true],
    ["1,2,3456", true],
    ["가,나,다,라,마,바", false],
  ])("입력된 값이 쉼표(,)로 구분된 숫자들이 아니면 false다", (numbers, expected) => {
    expect(checkAllInputsTypeisNumber(numbers)).toBe(expected);
  })

  test.each([
    ["1,2,3,5,6", false],
    ["1,2,3,4,5,6", true],
    ["1,2,3456", false],
    ["가,나,다,라,마,바", true],
  ])("입력된 값을 쉼표(,)로 나눴을때 길이가 6이 아니면 false다", (numbers, expected) => {
    expect(checkInputsLengthValid(numbers)).toBe(expected);
  });

  test.each([
    ['33', true],
    ['99', false],
    ['100', false],
    ['101', false],
    ['1', true],
    ['0', false],
  ])("입력된 보너스 번호가 45 이상 0 이하이면 false다.", (bouns, expected) => {
    expect(checkBounsValid(bouns)).toBe(expected);
  });
});
