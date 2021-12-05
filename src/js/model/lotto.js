import { LOTTO, PRIZE_TABLE } from '../constant/lotto.js';
import { issueRandomLotto } from '../service/lotto.js';

const getRank = (answer, input) => {
  let rank = Object.entries(input).reduce(
    (prev, [key, value]) => (!answer.includes(value) || key === 'bonus' ? prev : prev + 1),
    0
  );

  if (answer.includes(input.bonus) && rank === 5) {
    rank += 0.5;
  }

  return rank;
};

const initialResult = { 6: 0, 5.5: 0, 5: 0, 4: 0, 3: 0 };

const lottoManager = {
  amount: 0,
  lottos: [],
  result: initialResult,

  setAmount(price) {
    this.amount = Math.floor(price / LOTTO.PRICE);
  },

  hasLeft() {
    return this.lottos.length < this.amount;
  },

  issue(lotto) {
    this.lottos.push(lotto);
  },

  issueAll() {
    while (this.hasLeft()) {
      this.lottos.push(...[...Array(this.amount)].map(issueRandomLotto));
    }
  },

  setResult(answer) {
    this.resetResult();
    this.lottos.forEach((lotto) => {
      const rank = getRank(lotto, answer);

      if (rank < LOTTO.MIN_MATCH_AMOUNT) return;

      this.result[rank]++;
    });
  },

  getTotalPrize() {
    return (
      Object.entries(this.result).reduce(
        (prev, [key, value]) => prev + PRIZE_TABLE[key] * value,
        0
      ) || 0
    );
  },

  getProfitPercentage() {
    return Math.trunc((this.getTotalPrize() / (LOTTO.PRICE * this.lottos.length)) * 100) || 0;
  },

  resetAll() {
    this.resetAmount();
    this.resetLottos();
    this.resetResult();
  },

  resetAmount() {
    this.amount = 0;
  },

  resetLottos() {
    this.lottos = [];
  },

  resetResult() {
    this.result = { ...initialResult };
  },
};

export default lottoManager;
