import { LOTTO } from "../../src/constants/lottos.js";
import LottoGenerator from "../../src/domain/LottoGenerator.js";

describe("LottoGenerator - 구매한 금액 만큼 로또 생성 테스트", () => {
  let lottoGenerator;

  beforeEach(() => {
    lottoGenerator = new LottoGenerator();
  });

  test("로또 1장의 가격은 1,000원이다.", () => {
    const price = 3000;
    const lottos = lottoGenerator.issueLottoTicket(price / LOTTO.PRICE);
    expect(lottos).toHaveLength(3);
  });

  test("로또 번호는 1~45 사이에서 랜덤으로 생성한다.", () => {
    const lotto = lottoGenerator.issueLottoTicket(1)[0];
    const lottoNumbers = lotto.lottoNumbers;

    lottoNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(LOTTO.MIN_RANGE);
      expect(number).toBeLessThanOrEqual(LOTTO.MAX_RANGE);
    });
  });

  test("로또 번호는 6개 생성한다.", () => {
    const lotto = lottoGenerator.issueLottoTicket(1)[0];
    const lottoNumbers = lotto.lottoNumbers;

    expect(lottoNumbers).toHaveLength(6);
  });
});
