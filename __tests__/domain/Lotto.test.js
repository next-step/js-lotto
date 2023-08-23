import { LOTTO_REWARD, LOTTO_REWARD_CODE } from '../../src/js/constants/lotto-config.js';
import { LottoMachine, Lotto } from '../../src/js/domain/index.js';
import { DEFAULT_LOTTO_NUMBERS, LOTTO_REWARD_DUMMY, MATCHED_BONUS, UNMATCHED_BONUS } from '../constants/lotto.js';

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

describe('로또 결과 확인 테스트', () => {
  it.each([
    [LOTTO_REWARD_DUMMY.FIRST, LOTTO_REWARD[LOTTO_REWARD_CODE.FIRST].matchedCount],
    [LOTTO_REWARD_DUMMY.SECOND, LOTTO_REWARD[LOTTO_REWARD_CODE.SECOND].matchedCount],
    [LOTTO_REWARD_DUMMY.THIRD, LOTTO_REWARD[LOTTO_REWARD_CODE.THIRD].matchedCount],
    [LOTTO_REWARD_DUMMY.FOURTH, LOTTO_REWARD[LOTTO_REWARD_CODE.FOURTH].matchedCount],
    [LOTTO_REWARD_DUMMY.FIFTH, LOTTO_REWARD[LOTTO_REWARD_CODE.FIFTH].matchedCount],
    [LOTTO_REWARD_DUMMY.LOST, 0],
  ])('로또는 입력받은 배열과 비교하여 몇개가 동일한지 알 수 있다.', (winningNumbers, matchCount) => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check(winningNumbers, MATCHED_BONUS);

    expect(lotto.matchCount).toBe(matchCount);
  });

  it('로또는 보너스 번호가 자신의 번호에 포함되는지 알 수 있다.', () => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check(DEFAULT_LOTTO_NUMBERS, MATCHED_BONUS);

    expect(lotto.hasBonus).toBeTruthy();
  });

  it('로또는 보너스 번호가 자신의 번호에 포함되지 않는지 알 수 있다.', () => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);
    lotto.check(DEFAULT_LOTTO_NUMBERS, UNMATCHED_BONUS);

    expect(lotto.hasBonus).toBeFalsy();
  });
});
