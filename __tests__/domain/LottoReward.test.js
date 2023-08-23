import {
  FifthPrize,
  FirstPrize,
  FourthPrize,
  LottoPrize,
  SecondPrize,
  ThirdPrize,
} from '../../src/js/domain/LottoPrize/index.js';
import { LottoReward, Lotto, WinningLotto } from '../../src/js/domain/index.js';

describe('로또 등수 확인 테스트', () => {
  it('당첨로또와 6개가 동일하면 1등이다.', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(numbers);
    const winningLotto = new WinningLotto(numbers, 7);

    const prize = LottoReward.getPrize(winningLotto, lotto);

    expect(prize instanceof FirstPrize).toBeTruthy();
    expect(prize.getPrize()).toBe(2_000_000_000);
  });

  it('당첨로또와 5개가 동일하며 보너스번호를 포함하면 2등이다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 7], 6);

    const prize = LottoReward.getPrize(winningLotto, lotto);

    expect(prize instanceof SecondPrize).toBeTruthy();
    expect(prize.getPrize()).toBe(30_000_000);
  });

  it('당첨로또와 5개가 동일하며 보너스번호를 미포함하면 3등이다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 7], 8);

    const prize = LottoReward.getPrize(winningLotto, lotto);

    expect(prize instanceof ThirdPrize).toBeTruthy();
    expect(prize.getPrize()).toBe(1_500_000);
  });

  it('당첨로또와 4개가 동일하면 4등이다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 7, 8], 9);

    const prize = LottoReward.getPrize(winningLotto, lotto);

    expect(prize instanceof FourthPrize).toBeTruthy();
  });

  it('당첨로또와 3개가 동일하면 5등이다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto([1, 2, 3, 7, 8, 9], 10);

    const prize = LottoReward.getPrize(winningLotto, lotto);

    expect(prize instanceof FifthPrize).toBeTruthy();
  });

  it.each([
    {
      numbers: [1, 2, 13, 14, 15, 16],
    },
    {
      numbers: [1, 12, 13, 14, 15, 16],
    },
    {
      numbers: [11, 12, 13, 14, 15, 16],
    },
  ])('당첨로또와 2개 이하로 동일하면 낙첨이다.', ({ numbers }) => {
    const lotto = new Lotto(numbers);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    const prize = LottoReward.getPrize(winningLotto, lotto);

    expect(prize instanceof LottoPrize).toBeTruthy();
  });
});
