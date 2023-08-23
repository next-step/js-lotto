import {
  FIFTH_PLACE_AMOUNT,
  FIRST_PLACE_AMOUNT,
  FOURTH_PLACE_AMOUNT,
  LOTTO_AMOUNT_UNIT,
  LOTTO_CALCULATED_RANK,
  LOTTO_SECOND_PLACE_DEFAULT_COUNT,
  PROFIT_RATE_PERCENTAGE_UNIT,
  SECOND_PLACE_AMOUNT,
  THIRD_PLACE_AMOUNT,
} from '../constants/lotto.const.js';

class LottoStatistics {
  #statistics = {
    'first place': 0,
    'second place': 0,
    'third place': 0,
    'fourth place': 0,
    'fifth place': 0,
    'no luck': 0,
  };

  constructor() {}

  getStatistics() {
    return this.#statistics;
  }

  setStatistics(lottoCandidates, lottoAnswer, lottoBonus) {
    lottoCandidates.forEach((myLotto) => {
      let answerCount = 0;
      lottoAnswer.forEach((answer) => {
        if (myLotto.includes(answer)) {
          answerCount += 1;
        }
      });
      if (
        answerCount === LOTTO_SECOND_PLACE_DEFAULT_COUNT &&
        myLotto.includes(lottoBonus)
      ) {
        this.#statistics['second place'] += 1;
      } else {
        const rank = this.calculateRank(answerCount);
        this.#statistics[rank] += 1;
      }
    });
  }

  calculateRank(count) {
    if (count in LOTTO_CALCULATED_RANK) {
      return LOTTO_CALCULATED_RANK[count];
    }

    return 'no luck';
  }

  calculateProfitRate(purchasedLottoCounts) {
    if (purchasedLottoCounts === 0) {
      return 0;
    }

    let profitRate = 0;

    const purchaseAmount = purchasedLottoCounts * LOTTO_AMOUNT_UNIT;
    const totalProfit =
      FIRST_PLACE_AMOUNT * this.#statistics['first place'] +
      SECOND_PLACE_AMOUNT * this.#statistics['second place'] +
      THIRD_PLACE_AMOUNT * this.#statistics['third place'] +
      FOURTH_PLACE_AMOUNT * this.#statistics['fourth place'] +
      FIFTH_PLACE_AMOUNT * this.#statistics['fifth place'];

    profitRate =
      ((totalProfit - purchaseAmount) / purchaseAmount) *
      PROFIT_RATE_PERCENTAGE_UNIT;

    return profitRate;
  }
}

export default LottoStatistics;
