import Lottos from "../src/domain/Lottos.js";

describe("로또 번호 검증", () => {
  it("로또 번호는 1부터 45까지의 숫자 6개로 구성되어 있다.", () => {
    expect(() => {
      new Lottos({ numbers: [1, 2, 3, 4, 5, 6] });
    }).not.toThrow();
    expect(() => {
      new Lottos({ numbers: [1, 2, 3, 4, 5, 46] });
    }).toThrow("1 이상 45 이하 숫자를 입력해 주세요.");
    expect(() => {
      new Lottos({ numbers: [1, 2, 3, 4, 5] });
    }).toThrow("로또 번호는 6개를 입력해 주세요.");
  });

  it("로또 번호는 서로 중복되지 않아야 한다.", () => {
    expect(() => {
      new Lottos({ numbers: [1, 2, 3, 4, 5, 5] });
    }).toThrow("로또 번호는 중복될 수 없습니다.");
  });
});
