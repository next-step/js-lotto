import { Lotto, LottoRewards, WinningLotto } from '../../src/js/domain/index.js';

describe('로또 상금 목록 테스트', () => {
  it('당첨로또와 6개가 동일하면 1등이다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
    const lottoReward = new LottoRewards([lotto], winningLotto);

    expect(lottoReward.prizeTable[Symbol.for('first')].quantity).toBe(1);
  });

  it('당첨로또와 5개가 동일하며 보너스번호를 포함하면 2등이다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 7], 6);
    const lottoReward = new LottoRewards([lotto], winningLotto);

    expect(lottoReward.prizeTable[Symbol.for('second')].quantity).toBe(1);
  });

  it('당첨로또와 5개가 동일하며 보너스번호를 미포함하면 3등이다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 7], 8);
    const lottoReward = new LottoRewards([lotto], winningLotto);

    expect(lottoReward.prizeTable[Symbol.for('third')].quantity).toBe(1);
  });

  it('당첨로또와 4개가 동일하면 4등이다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 7, 8], 9);
    const lottoReward = new LottoRewards([lotto], winningLotto);

    expect(lottoReward.prizeTable[Symbol.for('fourth')].quantity).toBe(1);
  });

  it('당첨로또와 3개가 동일하면 5등이다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningLotto = new WinningLotto([1, 2, 3, 7, 8, 9], 10);
    const lottoReward = new LottoRewards([lotto], winningLotto);

    expect(lottoReward.prizeTable[Symbol.for('fifth')].quantity).toBe(1);
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
    const lottoReward = new LottoRewards([lotto], winningLotto);

    Object.getOwnPropertySymbols(lottoReward.prizeTable).forEach((rank) => {
      expect(lottoReward.prizeTable[rank].quantity).toBe(0);
    });
  });
});

describe('로또 상금 목록 테스트', () => {
  it.each([
    {
      lotto: [1, 2, 3, 4, 5, 6],
      result: 200000000.0,
    },
    {
      lotto: [10, 11, 12, 13, 14, 15],
      result: 0.0,
    },
  ])('수익률을 계산한다.', ({ lotto, result }) => {
    const lottos = [new Lotto(lotto)];
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
    const lottoRewards = new LottoRewards(lottos, winningLotto);
    const proceed = 1_000;
    const rateOfReturn = lottoRewards.getRateOfReturn(proceed);

    expect(rateOfReturn).toBe(result);
  });
});
