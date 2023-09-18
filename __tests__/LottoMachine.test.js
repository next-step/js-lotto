import LottoMachine from "../src/js/domain/models/LottoMachine";
import Lotto from "../src/js/domain/models/Lotto";

describe("로또 한 장을 발행한다.", () => {
  const lottoMachine = new LottoMachine();
  describe("issueLotto() 테스트", () => {
    it("로또 하나를 반환한다.", () => {
      const issuedLotto = lottoMachine.issueLotto();
      expect(issuedLotto).toBeInstanceOf(Lotto);
    });
  });
});
