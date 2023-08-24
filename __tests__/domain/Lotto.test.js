import ERROR from '../../src/js/constants/error.js';
import { Lotto, LottoMachine } from '../../src/js/domain/index.js';

const isAscending = (arr) => arr.every((item, idx) => (idx === 0 ? true : item >= arr[idx - 1]));

describe('오름차순 확인 테스트', () => {
  it.each([
    [1, 2, 3, 4, 5, 6],
    [11, 24, 24, 24, 25],
    [-3, -1, 0, 2],
  ])('배열이 오름차순일시 true를 반환한다', (...arr) => {
    expect(isAscending([...arr])).toBeTruthy();
  });
  it.each([
    [1, 2, 3, 4, 5, 4],
    [11, 24, 24, 24, -1],
    [-3, -1, 0, -1],
  ])('배열이 오름차순 아닐시 false를 반환한다', (...arr) => {
    expect(isAscending([...arr])).toBeFalsy();
  });
});

describe('로또 구매 테스트', () => {
  it('로또는 여섯개의 숫자로 이루어진 배열을 매개변수로 받으며 그 값을 필드에 소유한다.', () => {
    const lottoMachine = new LottoMachine();
    const [lotto] = lottoMachine.buy(1000);

    expect(lotto.numbers.length).toBe(6);
  });
});

it('로또는 오름차순으로 정렬된다', () => {
  const lottoMachine = new LottoMachine();
  const lottos = lottoMachine.buy(10_000);
  lottos.forEach((lotto) => {
    expect(isAscending(lotto.numbers)).toBeTruthy();
  });
});

describe('로또 생성 테스트', () => {
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
});
