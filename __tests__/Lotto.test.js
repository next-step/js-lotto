import Lotto from "../src/js/domain/Lotto";

describe("로또 객체 생성 테스트", () => {
  describe("생성자 내부 로직 테스트", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    it("lottoNumbers를 저장한다.", () => {
      expect(lotto.getLottoNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("matchCount와 isBonusMatched를 null로 초기화한다.", () => {
      const { matchedCount, isBonusMatched } = lotto.getMatchResult();
      expect(matchedCount).toBeNull();
      expect(isBonusMatched).toBeNull();
    });
  });

  describe("생성자 반환값 테스트", () => {
    it("Lotto 인스턴스를 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });

  describe("of() 테스트", () => {
    it("Lotto 인스턴스를 반환한다.", () => {
      const lotto = Lotto.of([1, 2, 3, 4, 5, 6]);
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });
});
