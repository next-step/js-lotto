import { calculateLottoResults } from '../../src/domains/jackpot/utils';

describe('calculateLottoResults 관련 함수', () => {
  test.each([
    {
      description:
        '여러 개의 로또 번호가 주어졌을 때, 올바른 당첨 결과를 반환해야 한다.',
      orderedLottos: [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 10],
        [1, 2, 3, 4, 20, 21],
        [1, 2, 3, 10, 20, 30],
        [10, 20, 30, 31, 32, 33],
      ],
      expected: [1, 2, 3, 4, 5, 0],
    },
    {
      description: '로또 번호가 비어있는 경우, 빈 배열을 반환한다.',
      orderedLottos: [],
      expected: [],
    },
  ])('$description', ({ orderedLottos, expected }) => {
    const results = calculateLottoResults(orderedLottos, [1, 2, 3, 4, 5, 6], 7);

    const ranks = results.map((result) => result.rank);

    expect(ranks).toEqual(expected);
  });
});
