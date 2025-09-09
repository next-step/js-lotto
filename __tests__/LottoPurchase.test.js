import LottoPurchase from "../src/class/lottoPurchase.js";

describe("로또구매", () => {
  test("구입 금액이 1000원 단위인가?", () => {
    const lotto = new LottoPurchase();
    const cost = 1000;

    const isValid = lotto.amountUnitCheck(cost);

    expect(isValid).toBe(true);
  });

  test("금액 만큼의 무작위 숫자 배열을 출력하는가?", () => {
    const lotto = new LottoPurchase();
    const cost = 3000;

    const lottos = lotto.buyLotto(cost);

    expect(lottos).toHaveLength(3);
  });

  test("로또의 숫자가 6자리인가?", () => {
    const lotto = new LottoPurchase();
    const newLotto = [1, 2, 3, 4, 5, 6];

    const createdLotto = lotto.createLotto(newLotto);

    console.log("createdLotto", createdLotto);

    expect(createdLotto).toHaveLength(6);
  });

  test("로또의 숫자가 모두 다른가?", () => {
    const lotto = new LottoPurchase();
    const randomNumbers = [1, 2, 3, 4, 5, 6];
    const randomNumber = 7;


    const isValid = lotto.isDifferentNumber(randomNumbers, randomNumber);

    expect(isValid).toBe(true);
  });

  test("로또 번호는 오름차순인가?", () => {
    const lotto = new LottoPurchase();

    const lottoNumber = [6, 5, 4, 3, 2, 1];

    const isValid = lotto.ascLotto(lottoNumber);

    expect(isValid).toEqual([1, 2, 3, 4, 5, 6]);
  });

});
