import {
  validateLottoNumbers,
  validateBonusNumber,
  DuplicateBonusNumberError,
  DuplicateLottoNumberError,
  InvalidLottoCountError,
  InvalidLottoNumberError,
} from "../src/domain/lottoValidations";

describe("로또 유효성 검사 테스트", () => {
  it("로또 번호가 6개가 아니면 InvalidLottoCountError를 던져야 한다.", () => {
    expect(() => validateLottoNumbers([1, 2, 3, 4, 5])).toThrow(
      InvalidLottoCountError
    );
  });

  it("로또 번호에 중복이 있으면 DuplicateLottoNumberError를 던져야 한다.", () => {
    expect(() => validateLottoNumbers([1, 2, 3, 4, 5, 5])).toThrow(
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
      expect(() => validateLottoNumbers(value)).toThrow(
        InvalidLottoNumberError
      );
    }
  );

  it("보너스 번호가 1부터 45 사이의 자연수가 아니면 InvalidLottoNumberError를 던져야 한다.", () => {
    const winningNumbers = [8, 21, 23, 41, 42, 43];
    const bonusNumber = 0;

    expect(() => validateBonusNumber(winningNumbers, bonusNumber)).toThrow(
      InvalidLottoNumberError
    );
  });

  it("보너스 번호가 당첨번호와 겹치면 DuplicateBonusNumberError를 던져야 한다.", () => {
    const winningNumbers = [8, 21, 23, 41, 42, 43];
    const bonusNumber = 8;

    expect(() => validateBonusNumber(winningNumbers, bonusNumber)).toThrow(
      DuplicateBonusNumberError
    );
  });
});
