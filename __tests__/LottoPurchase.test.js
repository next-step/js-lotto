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

    expect(lottos.length).toBe(3);
  });

  test("로또의 숫자가 6자리인가?", () => {
    const lotto = new LottoPurchase();
    const newLotto = ["1", "2", "3", "4", "5", "6"];

    const createdLotto = lotto.createLotto(newLotto);

    console.log("createdLotto", createdLotto);

    expect(createdLotto.length).toBe(6);
  });

  test("로또의 숫자가 모두 다른가?", () => {
    const lotto = new LottoPurchase();
    const randomNumbers = [1, 2, 3, 4, 5];
    const randomNumber = 6;

    const isValid = lotto.isDifferentNumber(randomNumbers, randomNumber);

    expect(isValid).toBe(true);
  });
});
