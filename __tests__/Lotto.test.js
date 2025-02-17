import Lotto from "../src/domain/Lotto.js";

describe("로또 생성 테스트", () => {
  it("주어진 번호로 Lotto 인스턴스를 생성해야 한다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(numbers);
    expect(lotto.numbers).toEqual(numbers);
  });
});
