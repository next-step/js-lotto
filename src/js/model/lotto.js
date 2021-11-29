import { LOTTO_PRICE, MIN_MATCH_AMOUNT, PRIZE_TABLE } from '../constant/lotto.js';
import { issueLotto } from '../service/lotto.js';

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
  lottos: [],
  result: initialResult,

  issue(amount) {
    this.lottos = [...Array(amount)].map(issueLotto);
  },

  setResult(answer) {
    this.resetResult();
    this.lottos.forEach((lotto) => {
      const rank = getRank(lotto, answer);

      if (rank < MIN_MATCH_AMOUNT) return;

      this.result[rank]++;
    });
  },

  resetAll() {
    this.resetLottos();
    this.resetResult();
  },

  resetLottos() {
    this.lottos = [];
  },

  resetResult() {
    this.result = { ...initialResult };
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
    return Math.trunc((this.getTotalPrize() / (LOTTO_PRICE * this.lottos.length)) * 100) || 0;
  },
};

export default lottoManager;
