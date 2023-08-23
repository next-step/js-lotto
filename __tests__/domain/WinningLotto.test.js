import ERROR from '../../src/js/constants/error';
import { WinningLotto } from '../../src/js/domain/WinningLotto';

describe('당첨 로또 테스트', () => {
  it.each([
    { numbers: [1, 2, 3, 4, 5, 6], bonus: 7 },
    { numbers: [1, 2, 3, 11, 23, 45], bonus: 7 },
    { numbers: [3, 2, 4, 44, 43, 45], bonus: 7 },
  ])('6개의 중복되지 않은 숫자와 보너스를 입력할 시 에러가 발생하지 않는다.', ({ numbers, bonus }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new WinningLotto(numbers, bonus);
    }).not.toThrow();
  });

  it.each([
    { numbers: [1, 2, 3, 4, 5], bonus: 7 },
    { numbers: [1, 2, 3, 11, 23, 34, 44, 12], bonus: 7 },
    { numbers: [3, 2, 4, 44], bonus: 7 },
  ])('6개가 아닌 숫자를 입력할 시 에러가 발생한다.', ({ numbers, bonus }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new WinningLotto(numbers, bonus);
    }).toThrow(ERROR.WINNING_NUMBERS.UNMATCHED_QUANTITY);
  });

  it.each([
    { numbers: [1, 2, 3, 4, 5, 5], bonus: 7 },
    { numbers: [1, 2, 3, 11, 23, 23], bonus: 7 },
    { numbers: [3, 2, 4, 44, 43, 3], bonus: 7 },
  ])('중복된 당첨번호를 입력할 시 에러가 발생한다.', ({ numbers, bonus }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new WinningLotto(numbers, bonus);
    }).toThrow(ERROR.WINNING_NUMBERS.DO_NOT_ENTER_DUPLICATED_NUMBER);
  });

  it.each([
    { numbers: [1, 2, 3, 4, 5, 6], bonus: 6 },
    { numbers: [1, 2, 3, 11, 23, 45], bonus: 23 },
    { numbers: [3, 2, 4, 44, 43, 45], bonus: 45 },
  ])('중복된 보너스를 입력할 시 에러가 발생한다.', ({ numbers, bonus }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new WinningLotto(numbers, bonus);
    }).toThrow(ERROR.BONUS.DUPLICATED_WITH_WINNING_NUMBER);
  });
});
