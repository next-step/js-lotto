import Lotto from "../src/domain/Lotto.js";

describe("로또 생성 테스트", () => {
  describe("로또는 6개 번호를 갖는다.", () => {
    let lotto;

    beforeEach(() => {
      lotto = new Lotto();
    });

    it("번호 개수가 6개면 true다.", () => {
      expect(lotto.numbers.length === 6).toBeTruthy();
    });

    it("번호 개수가 5개면 false다.", () => {
      expect(lotto.numbers.length === 5).toBeFalsy();
    });

    it("번호 개수가 7개면 false다.", () => {
      expect(lotto.numbers.length === 7).toBeFalsy();
    });
  });
});
