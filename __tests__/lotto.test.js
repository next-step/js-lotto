import Lotto from '../src/js/domain/Lotto.js';
import LottoMachine from '../src/js/domain/LottoMachine.js';
import { DEFAULT_LOTTO_NUMBERS, LOTTO_REWARD_DUMMY, MATCHED_BONUS, UNMATCHED_BONUS } from './constants/lotto.js';

describe('로또 구매 테스트', () => {
  it('로또는 여섯개의 숫자로 이루어진 배열을 매개변수로 받으며 그 값을 필드에 소유한다.', () => {
    const lottoMachine = new LottoMachine();
    const [lotto] = lottoMachine.buy(1000);

    expect(lotto.numbers.length).toBe(6);
  });
});

describe('로또 결과 확인 테스트', () => {
  it.each([
    [LOTTO_REWARD_DUMMY.FIRST, 6],
    [LOTTO_REWARD_DUMMY.SECOND, 5],
    [LOTTO_REWARD_DUMMY.THIRD, 5],
    [LOTTO_REWARD_DUMMY.FOURTH, 4],
    [LOTTO_REWARD_DUMMY.FIFTH, 3],
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
