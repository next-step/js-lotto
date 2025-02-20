import { calculateLottoCount } from '../../src/domains/order/utils';

describe('calculateLottoCount 관련 함수', () => {
  describe('한 장당 1,000원이라고 가정했을 때', () => {
    test.each([
      {
        description: '5,000원은 로또 5장을 줘야한다.',
        amount: 5000,
        expected: 5,
      },
      {
        description: '10,000원은 로또 10장을 줘야한다.',
        amount: 10000,
        expected: 10,
      },
      {
        description: '12,300원은 로또 12장을 줘야한다.',
        amount: 12300,
        expected: 12,
      },
    ])('$description', ({ amount, expected }) => {
      expect(calculateLottoCount(amount)).toBe(expected);
    });
  });
});
