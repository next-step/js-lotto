import { LottoReward } from './LottoReward.js';

export class LottoRewards {
  #rewards = [];

  #totalPrize = 0;

  constructor(lottos, winningLotto) {
    this.#rewards = lottos.map((lotto) => winningLotto.getLottoReward(lotto)).filter((reward) => reward);
    this.#setTotalPrize();
  }

  #setTotalPrize() {
    this.#totalPrize = this.#rewards.reduce((acc, { prize }) => acc + prize, 0);
  }

  #countRewardQuantity(key) {
    return this.#rewards.filter((reward) => reward.key === key).length;
  }

  getRankList() {
    const rankList = Object.values(LottoReward).map((reward) => ({
      reward,
      quantity: this.#countRewardQuantity(reward.key),
    }));
    return rankList;
  }

  getRateOfReturn(proceeds, digit = 1) {
    return Number(((this.#totalPrize / proceeds) * 100).toFixed(digit));
  }
}
