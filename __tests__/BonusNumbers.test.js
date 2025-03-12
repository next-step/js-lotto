import BonusNumbers from "../src/domain/BonusNumbers.js";

describe("보너스 번호 테스트", () => {
  it("보너스 번호는 1부터 45까지의 숫자 중 고를 수 있다. 범위 밖의 숫자를 입력하면 예외가 발생한다.", () => {
    expect(() => {
      new BonusNumbers({ numbers: [99] });
    }).toThrow("1 이상 45 이하 숫자를 입력해 주세요.");
  });

  it("보너스 번호는 숫자가 아니면 예외가 발생한다.", () => {
    expect(() => {
      new BonusNumbers({ numbers: ["1"] });
    }).toThrow("로또 번호는 숫자만 입력 가능합니다.");
  });

  it("보너스 번호는 기본 1개의 숫자를 선택할 수 있다.", () => {
    expect(() => {
      new BonusNumbers({ numbers: [1, 2] });
    }).toThrow("로또 번호는 1개를 입력해 주세요.");

    expect(() => {
      new BonusNumbers({ numbers: [3, 4], count: 2 });
    }).not.toThrow("로또 번호는 1개를 입력해 주세요.");
  });
});
