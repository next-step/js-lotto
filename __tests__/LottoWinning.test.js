import Lotto from "../src/domain/Lotto";
import LottoResult from "../src/domain/LottoResult";
import LottoWinning from "../src/domain/LottoWinning";

describe("로또 당첨 테스트", () => {
  let resultLotto;
  let bonusNumber = 7;
  let lottoResult;

  beforeEach(() => {
    resultLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    lottoResult = new LottoResult(resultLotto, bonusNumber);
  });

  test("당첨 번호와 로또 번호를 비교해 같은 숫자들을 반환한다.", () => {
    const lotto = new Lotto([4, 5, 6, 7, 8, 9]);
    const lottoWinning = new LottoWinning(
      lotto.numbers,
      lottoResult.resultNumbers,
      lottoResult.bonusNumber
    );
    expect(
      lottoWinning.matchResultNumbers(lotto.numbers, lottoResult.resultNumbers)
    ).toEqual([4, 5, 6]);
  });
});

describe("로또 상금 테스트", () => {
  let resultLotto;
  let bonusNumber = 7;
  let lottoResult;

  beforeEach(() => {
    resultLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    lottoResult = new LottoResult(resultLotto, bonusNumber);
  });

  test("로또 번호 중에 보너스 번호가 있으면 true를 반환한다.", () => {
    const lotto = new Lotto([4, 5, 6, 7, 8, 9]);
    const lottoWinning = new LottoWinning(
      lotto.numbers,
      lottoResult.resultNumbers,
      lottoResult.bonusNumber
    );
    expect(
      lottoWinning.isMatchedBonusNumber(lotto.numbers, lottoResult.bonusNumber)
    ).toBe(true);
  });

  test("로또 번호와 당첨 번호 6개가 일치하면 상금이 2000000000원이다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const lottoWinning = new LottoWinning(
      lotto.numbers,
      lottoResult.resultNumbers,
      lottoResult.bonusNumber
    );
    expect(lottoWinning.prize).toBe(2000000000);
  });
  test("로또 번호와 당첨 번호 5개, 보너스번호가 일치하면 상금이 30000000원이다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 7]);
    const lottoWinning = new LottoWinning(
      lotto.numbers,
      lottoResult.resultNumbers,
      lottoResult.bonusNumber
    );
    expect(lottoWinning.prize).toBe(30000000);
  });
  test("로또 번호와 당첨 번호 5개가 일치하면 상금이 1500000이다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 8]);
    const lottoWinning = new LottoWinning(
      lotto.numbers,
      lottoResult.resultNumbers,
      lottoResult.bonusNumber
    );
    expect(lottoWinning.prize).toBe(1500000);
  });
  test("로또 번호와 당첨 번호 4개가 일치하면 상금이 50000이다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 44, 45]);
    const lottoWinning = new LottoWinning(
      lotto.numbers,
      lottoResult.resultNumbers,
      lottoResult.bonusNumber
    );
    expect(lottoWinning.prize).toBe(50000);
  });
  test("로또 번호와 당첨 번호 3개가 일치하면 상금이 5000이다.", () => {
    const lotto = new Lotto([1, 2, 3, 43, 44, 45]);
    const lottoWinning = new LottoWinning(
      lotto.numbers,
      lottoResult.resultNumbers,
      lottoResult.bonusNumber
    );
    expect(lottoWinning.prize).toBe(5000);
  });
});
