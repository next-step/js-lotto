import LotteryMachine from "../src/js/LotteryMachine";

describe("로또 발행 테스트", () => {
  it("6개의 숫자를 뽑는다.", () => {
    const lotto = LotteryMachine.issueLotto();
    expect(lotto.length).toBe(6);
  });

  it("로또 6개 숫자는 중복이 없다.", () => {
    const lotto = LotteryMachine.issueLotto();
    expect(new Set(lotto).size).toBe(6);
  });

  it("로또 6개 숫자는 [1, 45] 사이의 범위에 존재한다.", () => {
    const lotto = LotteryMachine.issueLotto();
    lotto.forEach((num) => expect(num >= 1 && num <= 45).toBe(true));
  });

  it("로또는 6개 숫자 배열 형태로 반환된다.", () => {
    const lotto = LotteryMachine.issueLotto();
    expect(lotto).toBeInstanceOf(Array);
    lotto.forEach((num) => expect(typeof num).toBe("number"));
  });
});
