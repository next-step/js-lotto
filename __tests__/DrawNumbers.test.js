import WinningNumbers from "../src/domain/WinningNumbers.js";
import BonusNumbers from "../src/domain/BonusNumbers.js";
import DrawNumbers from "../src/domain/DrawNumbers.js";

describe("추첨 번호 테스트", () => {
  it("추첨 번호는 중복될 수 없다.", () => {
    expect(() => {
      new DrawNumbers({
        winningNumbers: new WinningNumbers({ numbers: [1, 2, 3, 4, 5, 6] }),
        bonusNumbers: new BonusNumbers({ numbers: [6] }),
      });
    }).toThrow("로또 번호는 중복될 수 없습니다.");
  });
});
