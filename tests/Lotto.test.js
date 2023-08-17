import { Lotto } from '../src/js/domain/Lotto';

describe('Lotto', () => {
  describe('로또 숫자는 6자리이다.', () => {
    test.each([6, 6, 6, 6])('.numbers.length', (lengthOfNumbers) => {
      expect(lengthOfNumbers).toBe(new Lotto().numbers.length);
    });
  });

  describe('로또 숫자는 1이상이다.', () => {
    test.each([1, 1, 1, 1, 1])('number', (minimumNumber) => {
      const numbers = new Lotto().numbers;

      if (!numbers.length) {
        throw new Error('lotto 숫자 없음');
      }

      new Lotto().numbers.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('로또 숫자는 45이하이다.', () => {
    test.each([45, 45, 45, 45, 45])('number', (minimumNumber) => {
      const numbers = new Lotto().numbers;

      if (!numbers.length) {
        throw new Error('lotto 숫자 없음');
      }

      new Lotto().numbers.forEach((number) => {
        expect(number).toBeLessThanOrEqual(45);
      });
    });
  });

  it('로또는 중복없는 6개의 숫자이다', () => {
    const numbers = new Lotto().numbers;

    if (!numbers.length) {
      throw new Error('lotto 숫자 없음');
    }

    const notDuplicatedNumbers = [...new Set(numbers)];

    expect(numbers.length).toBe(notDuplicatedNumbers.length);
  });
});
