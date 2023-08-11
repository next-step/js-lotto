import { LOTTO_PRIZE_TABLE } from '../src/js/constants/lotto-config.js';
import Exchange from '../src/js/domain/Exchange.js';
import Lotto from '../src/js/domain/Lotto.js';
import LottoMachine from '../src/js/domain/LottoMachine.js';

const DEFAULT_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

describe('로또 구매 테스트', () => {
  it.each([
    [1_000, 1],
    [10_000, 10],
  ])('금액을 입력하면 장당 가격에 비례한 로또를 발급받는다.', (money, sheets) => {
    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.buy(money);

    expect(lottos.length).toBe(sheets);
  });

  it('로또는 여섯개의 숫자로 이루어진 배열을 매개변수로 받으며 그 값을 필드에 소유한다.', () => {
    const lottoMachine = new LottoMachine();
    const [lotto] = lottoMachine.buy(1000);

    expect(lotto.numbers.length).toBe(6);
  });
});

describe('로또 결과 확인 테스트', () => {
  it.each([
    [DEFAULT_LOTTO_NUMBERS, 6],
    [[1, 2, 3, 4, 5, 9], 5],
    [[1, 2, 3, 4, 9, 9], 4],
    [[1, 2, 3, 9, 9, 9], 3],
    [[1, 2, 9, 9, 9, 9], 2],
    [[1, 9, 9, 9, 9, 9], 1],
    [[9, 9, 9, 9, 9, 9], 0],
  ])('로또는 입력받은 배열과 비교하여 몇개가 동일한지 알 수 있다.', (winningNumbers, correctCount) => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);

    expect(lotto.compare(winningNumbers)).toBe(correctCount);
  });

  it.each(DEFAULT_LOTTO_NUMBERS)('로또는 보너스 번호가 자신의 번호에 포함되는지 알 수 있다.', (bonus) => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);

    expect(lotto.hasBonus(bonus)).toBeTruthy();
  });

  it.each([7, 8, 9])('로또는 보너스 번호가 자신의 번호에 포함되지 않는지 알 수 있다.', (bonus) => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);

    expect(lotto.hasBonus(bonus)).toBeFalsy();
  });

  it.each([
    [DEFAULT_LOTTO_NUMBERS, 6, 1],
    [[1, 2, 3, 4, 5, 9], 6, 2],
    [[1, 2, 3, 4, 5, 9], 7, 3],
    [[1, 2, 3, 4, 9, 9], 6, 4],
    [[1, 2, 3, 9, 9, 9], 6, 5],
    [[1, 2, 9, 9, 9, 9], 6, 6],
    [[1, 9, 9, 9, 9, 9], 6, 7],
    [[9, 9, 9, 9, 9, 9], 6, 8],
  ])('로또는 당첨번호와 보너스 번호를 입력받으면 자신의 등수를 알 수 있다.', (winningNumbers, bonus, rank) => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);

    lotto.check(winningNumbers, bonus);

    expect(lotto.rank).toBe(rank);
  });

  it.each([
    [DEFAULT_LOTTO_NUMBERS, 6, LOTTO_PRIZE_TABLE['1']],
    [[1, 2, 3, 4, 5, 9], 6, LOTTO_PRIZE_TABLE['2']],
    [[1, 2, 3, 4, 5, 9], 7, LOTTO_PRIZE_TABLE['3']],
    [[1, 2, 3, 4, 9, 9], 6, LOTTO_PRIZE_TABLE['4']],
    [[1, 2, 3, 9, 9, 9], 6, LOTTO_PRIZE_TABLE['5']],
    [[1, 2, 9, 9, 9, 9], 6, 0],
    [[1, 9, 9, 9, 9, 9], 6, 0],
    [[9, 9, 9, 9, 9, 9], 6, 0],
  ])('거래소에 로또를 제출할 시 등수에 맞는 당첨금을 받는다', (winningNumbers, bonus, prize) => {
    const lotto = new Lotto(DEFAULT_LOTTO_NUMBERS);

    lotto.check(winningNumbers, bonus);

    const exchange = new Exchange();

    expect(exchange.getLottoPrize(lotto)).toBe(prize);
  });
});
