import { isValidJackpot } from '../../src/domains/jackpot/utils';

describe('isValidJackpot 관련 함수', () => {
  describe('당첨 숫자들의 개수와 유효성을 판별할 때', () => {
    test.each([
      {
        description: '6개이면 유효성 통과로 true를 반환한다.',
        jackpotNumbers: [1, 2, 3, 4, 5, 6],
        expected: true,
      },
      {
        description:
          '6개의 숫자가 중복 없이 1~45 범위 내에 있으면 true를 반환한다.',
        jackpotNumbers: [10, 20, 30, 40, 41, 42],
        expected: true,
      },
    ])('$description', ({ jackpotNumbers, expected }) => {
      const valid = isValidJackpot(jackpotNumbers);

      expect(valid).toBe(expected);
    });
  });

  describe('잘못된 입력이 주어질 때', () => {
    test.each([
      {
        description: '5개 이하이면 통과를 못하게 되어 false를 반환한다.',
        jackpotNumbers: [1, 2, 3, 4, 5],
        expected: false,
      },
      {
        description: '6개 초과이면 통과를 못하게 되어 false를 반환한다.',
        jackpotNumbers: [1, 2, 3, 4, 5, 6, 7],
        expected: false,
      },
      {
        description:
          '6개의 숫자들 중 로또 범위가 아닌 숫자가 포함되어 있을 경우, false를 반환한다.',
        jackpotNumbers: [1, 2, 3, 4, 5, 46],
        expected: false,
      },
      {
        description: '중복된 숫자가 포함되면 false를 반환한다.',
        jackpotNumbers: [1, 2, 3, 3, 4, 5],
        expected: false,
      },
    ])('$description', ({ jackpotNumbers, expected }) => {
      const valid = isValidJackpot(jackpotNumbers);

      expect(valid).toBe(expected);
    });
  });
});
