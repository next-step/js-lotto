import WinningLotto from "../../src/js/domain/MatchChecker/WinningLotto";
import {
  BonusNumberNotNumberError,
  BonusNumberOutOfRangeError,
  BonusNumberDuplicatedError,
} from "../../src/js/domain/MatchChecker/errors";

describe("당첨 로또 객체 생성 테스트", () => {
  describe("보너스 번호 유효성 검사 테스트", () => {
    describe("보너스 번호가 숫자 형태가 아니면, 에러를 발생시킨다.", () => {
      it.each(["1", "erica", true, null, undefined, function () {}, {}])(
        "%p",
        (input) => {
          expect(() => WinningLotto.from([1, 2, 3, 4, 5, 6], input)).toThrow(
            BonusNumberNotNumberError
          );
        }
      );
    });

    describe("보너스 번호가 [1, 45] 범위를 벗어난 숫자면, 에러를 발생시킨다.", () => {
      it.each([-1, 0, 46])("%p", (input) => {
        expect(() => WinningLotto.from([1, 2, 3, 4, 5, 6], input)).toThrow(
          BonusNumberOutOfRangeError
        );
      });
    });

    describe("당첨 번호와 보너스 번호가 중복되면, 에러를 발생시킨다.", () => {
      it("당첨 번호와 보너스 번호가 중복되면, 에러를 발생시킨다.", () => {
        expect(() => WinningLotto.from([1, 2, 3, 4, 5, 6], 1)).toThrow(
          BonusNumberDuplicatedError
        );
      });
    });
  });

  describe("보너스 번호 저장 테스트", () => {
    it("보너스 번호를 저장한다.", () => {
      const winningLotto = WinningLotto.from([1, 2, 3, 4, 5, 6], 7);
      expect(winningLotto.getBonusNumber()).toBe(7);
    });
  });
});

describe("보너스 번호 반환 테스트", () => {
  it("보너스 번호를 반환한다.", () => {
    const winningLotto = WinningLotto.from([1, 2, 3, 4, 5, 6], 7);
    expect(winningLotto.getBonusNumber()).toBe(7);
  });
});
