import Lotto from "../src/domain/Lotto";
import LottoResult from "../src/domain/LottoResult";

describe("로또 당첨 번호 테스트", () => {
  test("로도 당첨 결과는 resultNumbers, bonusNumber를 상태로 가진다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;
    const lottoResult = new LottoResult(lotto, bonusNumber);
    expect(lottoResult.resultNumbers).toEqual(lotto.numbers);
    expect(lottoResult.bonusNumber).toEqual(bonusNumber);
  });

  test("당첨 번호에 보너스 번호는 포함되지 않는다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;
    const lottoResult = new LottoResult(lotto, bonusNumber);
    expect(lottoResult.resultNumbers.includes(bonusNumber)).toBe(false);
  });

  test("당첨 로또 번호는 Lotto 클래스의 인스턴스가 아니면 에러가 발생한다.", () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 4;
    expect(() => new LottoResult(lotto, bonusNumber)).toThrow(
      "lotto는 Lotto클래스의 인스턴스가 아닙니다."
    );
  });

  test("당첨 번호와 보너스 번호가 겹치면 에러가 발생한다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 4;
    expect(() => new LottoResult(lotto, bonusNumber)).toThrow(
      "보너스 번호는 당첨번호와 중복될 수 없습니다."
    );
  });
});

describe("로또 결과 테스트", () => {
  let resultLotto;
  let bonusNumber = 7;
  let lottoResult;

  beforeEach(() => {
    resultLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    lottoResult = new LottoResult(resultLotto, bonusNumber);
  });

  test("로또 결과에서 당첨 번호와 로또 번호를 비교해 같은 숫자들을 반환한다.", () => {
    const lotto1 = new Lotto([4, 5, 6, 7, 8, 9]);
    const lotto2 = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lottoResult.matchResultNumbers(lotto1.numbers)).toEqual([4, 5, 6]);
    expect(lottoResult.matchResultNumbers(lotto2.numbers)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
  });

  test("로또 번호 중에 보너스 번호가 있으면 true를 반환한다.", () => {
    const lotto = new Lotto([4, 5, 6, 7, 8, 9]);
    expect(lottoResult.matchBonusNumber(lotto.numbers)).toBe(true);
  });

  // test("로또 번호와 당첨 번호 5개, 보너스번호가 일치하면 2등이다.", () => {
  //   const lottoResult = new lottoResult(lottoNumber, bonusNumber);
  //   expect();
  // });
  // test("로또 번호와 당첨 번호 5개가 일치하면 3등이다.", () => {
  //   const lottoResult = new lottoResult(lottoNumber, bonusNumber);
  //   expect();
  // });

  // test("로또 번호와 당첨 번호 4개가 일치하면 4등이다.", () => {
  //   const lottoResult = new lottoResult(lottoNumber, bonusNumber);
  //   expect();
  // });

  // test("로또 번호와 당첨 번호 3개가 일치하면 5등이다.", () => {
  //   const lottoResult = new lottoResult(lottoNumber, bonusNumber);
  //   expect();
  // });
});
