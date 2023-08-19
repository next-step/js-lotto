import { ERROR_MESSAGE } from '../src/js/constants/error-message';
import { Lotto } from '../src/js/domain/Lotto';

describe('Lotto', () => {
  describe('로또 숫자는 6개이다', () => {
    test.each([
      [[1, 2, 3, 4, 5, 6]],
      [[2, 7, 8, 14, 44, 45]],
      [[3, 8, 9, 15, 20, 26]],
    ])('new Lotto(numbers)', (numbers) => {
      expect(new Lotto(numbers)).toBeDefined();
    });
  });

  describe('로또 숫자가 6개가 아니면 에러를 발생한다.', () => {
    test.each([
      [[1, 2, 3, 4, 5]],
      [[2, 7, 8, 14, 15, 44, 45]],
      [[3, 8, 9, 15]],
    ])('new Lotto(numbers)', (numbers) => {
      expect(() => new Lotto(numbers)).toThrowError(
        ERROR_MESSAGE.NOT_VALID_LOTTO_NUMBER_LENGTH
      );
    });
  });

  describe('로또 숫자는 1이상 45이하이다', () => {
    test.each([
      [[1, 2, 3, 4, 5, 6]],
      [[2, 7, 8, 14, 44, 45]],
      [[3, 8, 9, 15, 20, 26]],
    ])('new Lotto(numbers)', (numbers) => {
      expect(new Lotto(numbers)).toBeDefined();
    });
  });

  describe('로또 숫자 중에 1미만 45초과인 숫자가 있으면 에러를 발생한다.', () => {
    test.each([
      [[-1, 2, 3, 4, 5, 6]],
      [[2, 7, 8, 14, 44, 46]],
      [[3, 8, 9, 15, 20, 100]],
    ])('new Lotto(numbers)', (numbers) => {
      expect(() => new Lotto(numbers)).toThrowError(
        ERROR_MESSAGE.NOT_VALID_LOTTO_NUMBER_RANGE
      );
    });
  });

  describe('로또 숫자 중 중복이 있으면 에러가 발생한다. ', () => {
    test.each([[[1, 1, 3, 4, 5, 6]], [[2, 7, 8, 14, 44, 44]]])(
      'new Lotto(numbers)',
      (numbers) => {
        expect(() => new Lotto(numbers)).toThrowError(
          ERROR_MESSAGE.DUPLICATED_LOTTO_NUMBER
        );
      }
    );
  });
});
