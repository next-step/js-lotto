import ERROR from '../../src/js/constants/error.js';
import { Lotto } from '../../src/js/domain/index.js';

const isAscending = (arr) => arr.every((item, idx) => (idx === 0 ? true : item >= arr[idx - 1]));

describe('로또 테스트', () => {
  it.each([
    { numbers: [1, 2, 3, 4, 5, 6] },
    { numbers: [42, 7, 16, 23, 6, 41] },
    { numbers: [7, 13, 42, 4, 45, 32] },
    { numbers: [12, 42, 16, 8, 45, 1] },
    { numbers: [32, 42, 16, 23, 9, 3] },
  ])('로또는 여섯개의 숫자로 이루어진 배열을 매개변수로 받으며 그 값을 필드에 소유한다.', ({ numbers }) => {
    const lotto = new Lotto(numbers);

    expect(lotto.numbers.length).toBe(6);
  });

  it.each([
    { numbers: [41, 40, 16, 23, 45, 1] },
    { numbers: [42, 7, 16, 23, 6, 41] },
    { numbers: [7, 13, 42, 4, 45, 32] },
    { numbers: [12, 42, 16, 8, 45, 1] },
    { numbers: [32, 42, 16, 23, 9, 3] },
  ])('로또는 오름차순으로 정렬된다', ({ numbers }) => {
    const lotto = new Lotto(numbers);
    expect(isAscending(lotto.numbers)).toBeTruthy();
  });

  it.each([{ numbers: [1, 2, 3, 4, 5] }, { numbers: [1, 2, 3, 11, 23, 34, 44, 12] }, { numbers: [3, 2, 4, 44] }])(
    '6개가 아닌 숫자를 입력할 시 에러가 발생한다.',
    ({ numbers }) => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Lotto(numbers);
      }).toThrow(ERROR.UNMATCHED_QUANTITY(Lotto.NUMBER_QUANTITY));
    }
  );

  it.each([{ numbers: [1, 2, 3, 4, 5, 5] }, { numbers: [1, 2, 3, 11, 23, 23] }, { numbers: [3, 2, 4, 44, 43, 3] }])(
    '중복된 당첨번호를 입력할 시 에러가 발생한다.',
    ({ numbers }) => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Lotto(numbers);
      }).toThrow(ERROR.DO_NOT_ENTER_DUPLICATED_NUMBER);
    }
  );

  it.each([1, 2, 3, 4, 5, 6])('로또는 입력받은 번호가 포함되는지 판별할 수 있다.', (number) => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.match(number)).toBeTruthy();
  });

  it.each([1, 2, 3, 4, 5, 6])('로또는 입력받은 번호가 포함되지 않는지 판별할 수 있다.', (number) => {
    const lotto = new Lotto([11, 12, 13, 14, 15, 16]);

    expect(lotto.match(number)).toBeFalsy();
  });
});
