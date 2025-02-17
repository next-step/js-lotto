import Lotto, {
  DuplicateBonusNumberError,
  DuplicateLottoNumberError,
  InvalidLottoCountError,
  InvalidLottoNumberError,
} from "../src/domain/Lotto";

describe("Lotto 클래스 테스트", () => {
  describe("===== 로또 숫자 유효성 테스트 =====", () => {
    it("로또 번호가 6개가 아니면 InvalidLottoCountError를 던져야 한다.", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5])).toThrow(InvalidLottoCountError);
    });

    it("로또 번호에 중복이 있으면 DuplicateLottoNumberError를 던져야 한다.", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow(
        DuplicateLottoNumberError
      );
    });

    it.each([
      [[0, 1, 2, 3, 4, 45]],
      [[1, 2, 3, 4, 5, 46]],
      [[1, 2, 3, 4, 5.5, 45]],
    ])(
      "로또 번호에 1부터 45 사이의 자연수가 아닌 값을 포함하면 InvalidLottoNumberError를 던져야 한다. (%p)",
      (value) => {
        expect(() => new Lotto(value)).toThrow(InvalidLottoNumberError);
      }
    );
  });

  describe("===== 당첨 번호 및 보너스 번호 유효성 테스트 ====", () => {
    it("당첨 번호가 6개가 아니면 InvalidLottoCountError를 던져야 한다.", () => {
      const lotto = new Lotto([8, 21, 23, 41, 42, 43]);
      const winningNumbers = [8, 21, 23, 41, 42];

      expect(() => lotto.compareNumbers(winningNumbers, 7)).toThrow(
        InvalidLottoCountError
      );
    });

    it("당첨 번호에 1부터 45 사이의 자연수가 아닌 값이 포함되면 InvalidLottoNumberError를 던져야 한다.", () => {
      const lotto = new Lotto([8, 21, 23, 41, 42, 43]);
      const winningNumbers = [8, 21, 23, 41, 42, 46];

      expect(() => lotto.compareNumbers(winningNumbers, 7)).toThrow(
        InvalidLottoNumberError
      );
    });

    it("당첨 번호에 중복이 있으면 DuplicateLottoNumberError를 던져야 한다.", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow(
        DuplicateLottoNumberError
      );
    });

    it("보너스 번호가 1부터 45 사이의 자연수가 아니면 InvalidLottoNumberError를 던져야 한다.", () => {
      const lotto = new Lotto([8, 21, 23, 41, 42, 43]);
      const bonusNumber = 0;

      expect(() =>
        lotto.compareNumbers([8, 21, 23, 41, 42, 43], bonusNumber)
      ).toThrow(InvalidLottoNumberError);
    });

    it("보너스 번호가 당첨번호와 겹치면 DuplicateBonusNumberError를 던져야 한다.", () => {
      const lotto = new Lotto([8, 21, 23, 41, 42, 43]);
      const winningNumbers = [8, 21, 23, 41, 42, 43];
      const bonusNumber = 8;

      expect(() => lotto.compareNumbers(winningNumbers, bonusNumber)).toThrow(
        DuplicateBonusNumberError
      );
    });
  });

  describe("===== 로또 번호와 당첨 번호 및 보너스 번호 비교 테스트 =====", () => {
    it("로또 번호와 당첨 번호를 비교할 때 일치하는 번호를 반환해야 한다.", () => {
      const lotto = new Lotto([8, 21, 23, 41, 42, 43]);
      const winningNumbers = [8, 21, 23, 41, 42, 43];
      const bonusNumber = 7;

      const { matchedNumbers, isBonusMatched } = lotto.compareNumbers(
        winningNumbers,
        bonusNumber
      );

      expect(matchedNumbers).toEqual([8, 21, 23, 41, 42, 43]);
      expect(isBonusMatched).toBe(false);
    });

    it("보너스 번호와 일치하면 isBonusMatched는 true여야 한다.", () => {
      const lotto = new Lotto([8, 21, 23, 41, 42, 43]);
      const winningNumbers = [8, 10, 23, 41, 42, 43];
      const bonusNumber = 21;

      const { isBonusMatched } = lotto.compareNumbers(
        winningNumbers,
        bonusNumber
      );

      expect(isBonusMatched).toBe(true);
    });
  });
});
