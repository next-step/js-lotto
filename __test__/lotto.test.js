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

  test("당첨 번호의 갯수가 잘못 됐다면 아니라면 에러가 throw 된다.", () => {
    const lotto = new Lotto();

    expect(() => lotto.getWinningNumberByString("1,2,3")).toThrow();
  });

  test("당첨 번호의 갯수가 맞다면 테스트가 통과 한다.", () => {
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

describe("로또 번호에 따라 몇개나 맞았는지 구하는 메서드 ", () => {
  it("로또 번호와 당첨번호가 전부 같은 경우", () => {
    const lotto = new Lotto();

    lotto.setLottos([[1, 2, 3, 4, 5, 6]]);
    lotto.setWinningNumber([1, 2, 3, 4, 5, 6]);
    lotto.setBounsNumber(7);

    expect(lotto.getHitNumberByLottoNumber([1, 2, 3, 4, 5, 6])).toStrictEqual({
      hitNumberCount: 6,
      isHitBonusNumber: false,
    });
  });
});

describe("당첨 된 로또에 대한 정보를 구하는 메서드", () => {
  it("1등이 당첨된 경우", () => {
    const lotto = new Lotto();

    lotto.setLottos([[6, 5, 4, 3, 2, 1]]);
    lotto.setWinningNumber([1, 2, 3, 4, 5, 6]);
    lotto.setBounsNumber(7);
    const rank = lotto.getRankCount();

    expect(rank).toStrictEqual({ 1: 1, 2: 0, 3: 0, 4: 0, 5: 0 });
  });

  it("2등이 당첨된 경우", () => {
    const lotto = new Lotto();

    lotto.setLottos([[1, 2, 3, 4, 5, 7]]);
    lotto.setWinningNumber([1, 2, 3, 4, 5, 8]);
    lotto.setBounsNumber(7);
    const rank = lotto.getRankCount();

    expect(rank).toStrictEqual({ 1: 0, 2: 1, 3: 0, 4: 0, 5: 0 });
  });
});
