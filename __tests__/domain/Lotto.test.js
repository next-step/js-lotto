import Lotto from "../../src/domain/Lotto.js";
import LottoNumber from "../../src/domain/LottoNumber.js";

describe("Lotto 클래스는", () => {
  describe("=== 생성에 대한 테스트 ===", () => {
    describe("> 생성할 때", () => {
      it("6개의 숫자를 가지고 있어야 한다", () => {
        const lottoNumbers = [
          new LottoNumber(1),
          new LottoNumber(2),
          new LottoNumber(3),
          new LottoNumber(4),
          new LottoNumber(5),
          new LottoNumber(6),
        ];
        const lotto = new Lotto(lottoNumbers);
        expect(lotto.getLottoNumbers()).toHaveLength(6);
      });
      it("로또 번호가 6개가 아니면 에러를 던져야 한다", () => {
        const lottoNumbers = [
          new LottoNumber(1),
          new LottoNumber(2),
          new LottoNumber(3),
          new LottoNumber(4),
          new LottoNumber(5),
        ];
        expect(() => new Lotto(lottoNumbers)).toThrow();
      });
      it("로또 번호가 중복되면 에러를 던져야 한다", () => {
        const lottoNumbers = [
          new LottoNumber(1),
          new LottoNumber(1),
          new LottoNumber(1),
          new LottoNumber(2),
          new LottoNumber(3),
          new LottoNumber(4),
        ];
        expect(() => new Lotto(lottoNumbers)).toThrow();
      });
      it.each([null, undefined, 1, "1"])(
        "로또 번호가 숫자가 아니면 에러를 던져야 한다 (입력: %p)",
        (lottoNumbers) => {
          expect(() => new Lotto(lottoNumbers)).toThrow();
        },
      );
    });
  });
});
