import Lotto from "../../src/domain/Lotto.js";

describe("Lotto 클래스 테스트", () => {
  test("당첨 번호와 일치하는 개수를 반환한다", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningNumbers = [1, 2, 3, 10, 11, 12];

    const matchCount = lotto.countMatches(winningNumbers);
    expect(matchCount).toBe(3);
  });

  test("보너스 번호 포함 여부를 확인한다", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.contains(1)).toBe(true);
    expect(lotto.contains(10)).toBe(false);
  });
});
