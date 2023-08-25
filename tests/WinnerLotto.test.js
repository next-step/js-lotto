import { ERROR_MESSAGE } from '../src/js/constants/error-message';
import { Lotto } from '../src/js/domain/Lotto';
import { WinningLotto } from '../src/js/domain/WinningLotto';

describe('WinningLotto', () => {
  it('보너스 번호는 당첨번호와 중복될 수 없습니다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 1;

    expect(
      () => new WinningLotto(new Lotto(winningNumbers), bonusNumber)
    ).toThrowError(ERROR_MESSAGE.DUPLICATED_BONUS_NUMBER);
  });

  describe('보너스 번호가 숫자 혹은 숫자로 변형 가능한 문자가 아닐 경우 에러가 납니다.', () => {
    test.each(['string', '#', '[]'])('new WinningLotto(_,%i)', (bonusNum) => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = bonusNum;

      expect(
        () => new WinningLotto(new Lotto(winningNumbers), bonusNumber)
      ).toThrowError();
    });
  });
});
