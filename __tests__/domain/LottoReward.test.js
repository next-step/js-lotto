import { LottoReward } from '../../src/js/domain/index.js';

describe('로또 상금 테스트', () => {
  it.each([5_000, 50_000])('LottoReward는 상금을 인자로 받아 필드에 보유한다', (prize) => {
    const reward = new LottoReward(prize);

    expect(reward.prize).toBe(prize);
  });
});
