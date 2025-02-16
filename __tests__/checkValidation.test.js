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
  test("입력된 값이 1000원 이상이 아니면 false를 반환한다.", () => {
    expect(checkCanBuyLotto("100")).toBe(false);
    expect(checkCanBuyLotto("900")).toBe(false);
    expect(checkCanBuyLotto("999")).toBe(false);
    expect(checkCanBuyLotto("1000")).toBe(true);
  });
});

describe("사용자가 로또 번호를 입력했을때", () => {
  test("입력된 값이 쉼표(,)로 구분된 6개의 숫자가 아니면 false다", () => {
    expect(checkAllInputsTypeisNumber("1,2,3,5,6")).toBe(true);
    expect(checkAllInputsTypeisNumber("1,2,3,4,5,6")).toBe(true);
    expect(checkAllInputsTypeisNumber("1,2,3456")).toBe(true);
    expect(checkAllInputsTypeisNumber("가,나,다,라,마,바")).toBe(false);

    expect(checkInputsLengthValid("1,2,3,5,6")).toBe(false);
    expect(checkInputsLengthValid("1,2,3,4,5,6")).toBe(true);
    expect(checkInputsLengthValid("1,2,3456")).toBe(false);
    expect(checkInputsLengthValid("가,나,다,라,마,바")).toBe(true);
  });

  test("입력된 보너스 번호가 100 이상 0 이하이면 false다.", () => {
    expect(checkBounsValid("33")).toBe(true);
    expect(checkBounsValid("99")).toBe(true);
    expect(checkBounsValid("100")).toBe(false);
    expect(checkBounsValid("101")).toBe(false);
    expect(checkBounsValid("-1")).toBe(false);
    expect(checkBounsValid("0")).toBe(false);
  });
});
