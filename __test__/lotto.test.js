import Lotto from "../src/js/lotto";

describe("구입할 수 있는 로또의 수를 구하는 메서드 테스트", () => {
  it("3000원을 받았다면 리턴값은 3이다.", () => {
    const lotto = new Lotto();
    const price = 3000;

    expect(lotto.getLottoQuantityByMoney(price)).toBe(3);
  });

  it("1000원 미만의 값을 받았다면 리턴값은 0이다.", () => {
    const lotto = new Lotto();
    const price1 = 1;
    const price300 = 300;
    const price999 = 999;

    expect(lotto.getLottoQuantityByMoney(price1)).toBe(0);
    expect(lotto.getLottoQuantityByMoney(price300)).toBe(0);
    expect(lotto.getLottoQuantityByMoney(price999)).toBe(0);
  });

  /**
   * 이건 isNumber테스트에서 이미 작성한 테스트라고 생각됨.
   * 앞으로 이런 종류의 테스트는 생략하는 것이 맞을 듯.
   * 타이핑 친게 아까워서 놔둠
   */
  it("0, null, undefined, 공백, 문자열이 입력되면 리턴값은 0이다.", () => {
    const lotto = new Lotto();
    const zero = 0;
    const nullValue = null;
    const undefinedValue = undefined;
    const blank = "";
    const blank_space = " ";
    const stringValue = "잘못된값";

    expect(lotto.getLottoQuantityByMoney(zero)).toBe(0);
    expect(lotto.getLottoQuantityByMoney(nullValue)).toBe(0);
    expect(lotto.getLottoQuantityByMoney(undefinedValue)).toBe(0);
    expect(lotto.getLottoQuantityByMoney(blank)).toBe(0);
    expect(lotto.getLottoQuantityByMoney(blank_space)).toBe(0);
    expect(lotto.getLottoQuantityByMoney(stringValue)).toBe(0);
  });
});

describe("로또 번호를 구하는 메서드 테스트", () => {
  test("", () => {
    const lotto = new Lotto();

    expect(lotto.getLottoNumber().length).toBe(6);
  });
});

describe("로또 당첨 번호를 테스트 하는 메서드", () => {
  test("양의 정수가 아닌 값이 입력된 경우 에러가 throw 된다.", () => {
    const lotto = new Lotto();

    expect(() => lotto.getWinningNumberByString("1,2,3,4,5,dsf")).toThrow();
    expect(() => lotto.getWinningNumberByString("1,2,3,4,5,")).toThrow();
    expect(() => lotto.getWinningNumberByString("1,2,3,4,5 ")).toThrow();
  });

  test("당첨 번호의 수가 6이 아니라면 에러가 throw ehlsek..", () => {
    const lotto = new Lotto();

    expect(() => lotto.getWinningNumberByString("1,2,3")).toThrow();
  });

  test("당첨 번호의 수가 6이 아니라면 에러가 throw ehlsek..", () => {
    const lotto = new Lotto();

    expect(lotto.getWinningNumberByString("1,2,3,4,5,6")).toStrictEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
    ]);
  });
});
