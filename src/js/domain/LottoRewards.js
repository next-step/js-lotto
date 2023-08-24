import { LottoReward } from './LottoReward.js';

const first = Symbol.for('first');
const second = Symbol.for('second');
const third = Symbol.for('third');
const fourth = Symbol.for('fourth');
const fifth = Symbol.for('fifth');

export class LottoRewards {
  #prizeTable = {
    [first]: {
      match: 6,
      prize: 2_000_000_000,
      hasBonus: false,
      quantity: 0,
    },
    [second]: {
      match: 5,
      prize: 30_000_000,
      hasBonus: true,
      quantity: 0,
    },
    [third]: {
      match: 5,
      prize: 1_500_000,
      hasBonus: false,
      quantity: 0,
    },
    [fourth]: {
      match: 4,
      prize: 50_000,
      hasBonus: false,
      quantity: 0,
    },
    [fifth]: {
      match: 3,
      prize: 5_000,
      hasBonus: false,
      quantity: 0,
    },
  };

  #rewards = [];

  #totalPrize = 0;

  constructor(lottos, winningLotto) {
    this.#rewards = lottos.map((lotto) => this.#getLottoReward(lotto, winningLotto)).filter((reward) => reward);
    this.#setTotalPrize();
  }

  get prizeTable() {
    return this.#prizeTable;
  }

  #getLottoReward(lotto, winningLotto) {
    const match = winningLotto.getMatchedCount(lotto);
    const hasBonus = winningLotto.hasBonus(lotto);
    const rank = this.#getRank(match, hasBonus);
    if (rank) {
      this.#prizeTable[rank].quantity += 1;
      return new LottoReward(this.#prizeTable[rank].prize);
    }
    return false;
  }

  #getRank(match, hasBonus) {
    if (match === this.#prizeTable[third].match && !hasBonus) {
      return third;
    }
    const prizeRank = Object.getOwnPropertySymbols(this.#prizeTable).find(
      (rank) => this.#prizeTable[rank].match === match
    );

    return prizeRank;
  }

  #setTotalPrize() {
    this.#totalPrize = this.#rewards.reduce((acc, { prize }) => acc + prize, 0);
  }

  getRateOfReturn(proceeds, digit = 1) {
    return Number(((this.#totalPrize / proceeds) * 100).toFixed(digit));
  }
}
