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
