import LotteryMachine from "../src/js/LotteryMachine";

describe("로또 발행 테스트", () => {
  let lotto;
  beforeEach(() => {
    lotto = LotteryMachine.issueLotto();
  });
  it("6개의 숫자를 뽑는다.", () => {
    expect(lotto.length).toBe(6);
  });

  it("로또 6개 숫자는 [1, 45] 사이의 범위에 존재한다.", () => {
    lotto.forEach((num) => expect(num >= 1 && num <= 45).toBe(true));
  });

  it("로또 6개 숫자는 중복이 없다.", () => {
    expect(new Set(lotto).size).toBe(6);
  });

  it("로또는 6개 숫자 배열로 반환된다.", () => {
    expect(lotto).toBeInstanceOf(Array);
    lotto.forEach((num) => expect(typeof num).toBe("number"));
  });
});
