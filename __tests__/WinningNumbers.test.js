import WinningNumbers from "../src/domain/WinningNumbers.js";

describe("당첨 번호 테스트", () => {
  it("당첨 번호는 중복될 수 없다.", () => {
    expect(() => {
      new WinningNumbers({
        numbers: [1, 2, 3, 4, 5, 5],
      });
    }).toThrow("로또 번호는 중복될 수 없습니다.");
  });
});
